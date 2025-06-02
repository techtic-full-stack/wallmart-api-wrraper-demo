import walmartAxios from "../config/axios";
import { Order } from "../models/order.model";
import { OrderLineItem } from "../models/orderLineItem.model";
import { SyncState } from "../models/syncState.model";
import { WalmartOrderType } from "../types/order";

export const createLabel = async (body: Body, token?: string) => {
  const { data } = await walmartAxios.post("/shipping/labels", body, {
    headers: { Authorization: token },
  });
  return data;
};

export const markOrderShipped = async (purchaseOrderId: string, body: Body, token?: string) => {
  const { data } = await walmartAxios.post(`/orders/${purchaseOrderId}/shipping`, body, {
    headers: { Authorization: token },
  });
  return data;
};

export const syncOrders = async (token?: string) => {
  try {
    const SYNC_KEY = "walmart_last_order_sync";
    const lastSync = await SyncState.findByPk(SYNC_KEY);
    const lastFetched = lastSync?.value || "2000-01-01T00:00:00Z";
    const response = await walmartAxios.get("/orders", {
      params: {
        limit: 50,
        shipNodeType: "SellerFulfilled",
        replacementInfo: false,
        createdStartDate: lastFetched,
      },
      headers: {
        Authorization: token,
      },
    });

    const orders: WalmartOrderType[] =
      response.data?.list?.elements?.order || [];
    
    let syncedCount = 0;
    const syncedOrderIds: string[] = []; // Track IDs of synced orders

    if (orders.length > 0) {
      const latestOrderDate = orders.reduce((max, order) => {
        const date = new Date(order.orderDate).toISOString();
        return date > max ? date : max;
      }, lastFetched);

      for (const order of orders) {
        const existingOrder = await Order.findOne({
          where: { order_number: order.purchaseOrderId },
        });

        const savedOrder = existingOrder
          ? await existingOrder.update({
              customer_order_id: order.customerOrderId,
              customer_email_id: order.customerEmailId,
              order_date: new Date(order.orderDate),
              status:
                order.orderLines.orderLine[0]?.orderLineStatuses.orderLineStatus[0]?.status || "Unknown",
              shipping_info: order.shippingInfo,
            })
          : await Order.create({
              order_number: order.purchaseOrderId,
              customer_order_id: order.customerOrderId,
              customer_email_id: order.customerEmailId,
              order_date: new Date(order.orderDate),
              status:
                order.orderLines.orderLine[0]?.orderLineStatuses.orderLineStatus[0]?.status || "Unknown",
              shipping_info: order.shippingInfo,
            });

        const orderId = savedOrder.id;
        syncedOrderIds.push(orderId); // Track this synced order

        // ...existing code for line items...
        for (const lineItem of order.orderLines.orderLine) {
          const existingLineItem = await OrderLineItem.findOne({
            where: { order_id: orderId, line_number: lineItem.lineNumber },
          });

          if (existingLineItem) {
            await existingLineItem.update({
              product_name: lineItem.item.productName,
              sku: lineItem.item.sku,
              quantity: parseInt(lineItem.orderLineQuantity.amount, 10),
              status:
                lineItem.orderLineStatuses.orderLineStatus[0]?.status || "Unknown",
              charges: lineItem.charges,
            });
          } else {
            await OrderLineItem.create({
              order_id: orderId,
              line_number: lineItem.lineNumber,
              product_name: lineItem.item.productName,
              sku: lineItem.item.sku,
              quantity: parseInt(lineItem.orderLineQuantity.amount, 10),
              status:
                lineItem.orderLineStatuses.orderLineStatus[0]?.status || "Unknown",
              charges: lineItem.charges,
            });
          }
        }
        syncedCount++;
      }

      await SyncState.upsert({
        key: SYNC_KEY,
        value: latestOrderDate,
      });

      console.log(
        `Synced ${syncedCount} orders. Updated sync time to ${latestOrderDate}`
      );
    } else {
      console.log("No new orders to sync.");
    }

    // Get only the synced orders from database to return
    const syncedOrders = syncedOrderIds.length > 0 
      ? await Order.findAll({
          where: { id: syncedOrderIds },
          include: [
            {
              model: OrderLineItem,
              required: false,
            }
          ],
          order: [['order_date', 'DESC']],
        })
      : [];

    return {
      success: true,
      message: `Synced ${syncedCount} orders.`,
      syncedCount,
      totalOrderCount: syncedOrders.length,
      orders: syncedOrders,
    };
  } catch (err: any) {
    console.error("Order sync failed:", err.message || err);
    
    return {
      success: false,
      message: err.message || err,
      syncedCount: 0,
      totalOrderCount: 0,
      orders: [],
    };
  }
};

export const shipWithWalmartRates = async (body: any, token?: string) => {
  try {
    const requestBody = {
      boxDimensions: body.boxDimensions,
      fromAddress: body.fromAddress,
      toAddress: body.toAddress,
      packageType: body.packageType,
      shipByDate: body.shipByDate,
      deliverByDate: body.deliverByDate,
    };

    const { data } = await walmartAxios.post(
      "/shipping/labels/shipping-estimates",
      requestBody,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
          "WM_SEC.ACCESS_TOKEN": token,
          "WM_QOS.CORRELATION_ID": `correlation-${Date.now()}`,
          "WM_SVC.NAME": "Walmart Service Name",
        },
      }
    );

    const sortedEstimates = data.data?.estimates
      ? data.data.estimates.sort(
          (a: { estimatedRate: { amount: number } }, b: { estimatedRate: { amount: number } }) =>
            a.estimatedRate.amount - b.estimatedRate.amount
        )
      : [];

    return {
      success: true,
      message: "Shipping rates fetched successfully.",
      rates: sortedEstimates,
      alertMessage: data.alertMessage || "No alert message provided.",
    };
  } catch (error: any) {
    console.error("Error in shipWithWalmartRates:", error.message || error);
    return {
      success: false,
      message: error.message || "Failed to fetch shipping rates.",
    };
  }
};

export const createShippingLabel = async (body: any, token?: string) => {
  try {
    console.log("Creating shipping label with Walmart API.");

    const requestBody = {
      boxDimensions: body.boxDimensions,
      fromAddress: body.fromAddress,
      carrierServiceType: body.carrierServiceType,
      carrierName: body.carrierName,
      purchaseOrderId: body.purchaseOrderId,
      boxItems: body.boxItems,
      packageType: body.packageType,
    };

    const { data } = await walmartAxios.post(
      "/shipping/labels",
      requestBody,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
          "WM_SEC.ACCESS_TOKEN": token,
          "WM_QOS.CORRELATION_ID": `correlation-${Date.now()}`,
          "WM_SVC.NAME": "Walmart Service Name",
        },
      }
    );

    // console.log("Shipping label created:", JSON.stringify(data, null, 2));

    return {
      success: true,
      message: "Shipping label created successfully.",
      labelData: data,
    };
  } catch (error: any) {
    console.error("Error in createShippingLabel:", error.message || error);
    return {
      success: false,
      message: error.message || "Failed to create shipping label.",
    };
  }
};

export const getAllOrders = async (limit?: number, offset?: number) => {
  try {
    const queryOptions: any = {
      include: [
        {
          model: OrderLineItem,
          required: false,
        }
      ],
      order: [['order_date', 'DESC']],
    };

    // Add pagination if limit is provided
    if (limit) {
      queryOptions.limit = limit;
      if (offset) {
        queryOptions.offset = offset;
      }
    }

    const orders = await Order.findAll(queryOptions);
    const totalCount = await Order.count();

    return {
      success: true,
      message: "Orders fetched successfully.",
      totalCount,
      orders,
    };
  } catch (error: any) {
    console.error("Error in getAllOrders:", error.message || error);
    return {
      success: false,
      message: error.message || "Failed to fetch orders.",
      totalCount: 0,
      orders: [],
    };
  }
};