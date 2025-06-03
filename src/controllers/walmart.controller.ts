import { Response } from "express";
import { handleError, logRequest } from "../helpers/utils";
import {
  createLabelSchema,
  fetchRatesSchema,
  markShippedSchema,
} from "../schemas/joi.schema";
import {
  createShippingLabel,
  shipWithWalmartRates,
  markOrderShipped,
  syncOrders,
  getAllOrders,
} from "../services/walmart.service";

import { ExtendedRequest } from "../types/extended";

export const getRates = async (req: ExtendedRequest, res: Response) => {
  try {
    const { success, message, rates, alertMessage } = await shipWithWalmartRates(req.body, req.token);

    res.json({ success, message, rates, alertMessage });
    return;
  } catch (error: any) {
    handleError(res, error, "Failed to fetch rates");
    return;
  }
};

export const getShippingLabel = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    const data = await createShippingLabel(req.body, req.token);
    res.json({ success: true, data });
    return;
  } catch (error: any) {
    handleError(res, error, "Failed to create label");
    return;
  }
};

export const markShipped = async (req: ExtendedRequest, res: Response) => {
  try {
    const { purchaseOrderId } = req.params;
    const payload = req.body;

    const data = await markOrderShipped(purchaseOrderId, payload, req.token);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error in markShipped:", error);
    handleError(res, error, "Failed to mark order as shipped");
  }
};

export const syncOrderManually = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    logRequest(req);
    const data = await syncOrders(req?.token);
    
    // Return the enhanced response with order details
    res.json({ 
      success: true, 
      data: {
        success: data.success,
        message: data.message,
        syncedCount: data.syncedCount,
        totalOrderCount: data.totalOrderCount,
        orders: data.orders
      }
    });
    return;
  } catch (error) {
    handleError(res, {}, "Failed to sync order manually");
    return;
  }
};

export const getOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : undefined;

    const data = await getAllOrders(limit, offset);
    
    res.json({ 
      success: data.success, 
      message: data.message,
      totalCount: data.totalCount,
      orders: data.orders
    });
    return;
  } catch (error: any) {
    handleError(res, error, "Failed to fetch orders");
    return;
  }
};
