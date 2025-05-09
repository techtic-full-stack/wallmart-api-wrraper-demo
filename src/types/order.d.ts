export interface WalmartOrderType {
  purchaseOrderId: string;
  customerOrderId: string;
  customerEmailId: string;
  orderDate: number;
  shippingInfo: {
    phone: string;
    estimatedDeliveryDate: number;
    estimatedShipDate: number;
    methodCode: string;
    postalAddress: {
      name: string;
      address1: string;
      address2: string | null;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      addressType: string;
    };
  };
  orderLines: {
    orderLine: {
      lineNumber: string;
      item: {
        productName: string;
        sku: string;
      };
      charges: {
        charge: {
          chargeType: string;
          chargeName: string;
          chargeAmount: {
            currency: string;
            amount: number;
          };
          tax: {
            taxName: string;
            taxAmount: {
              currency: string;
              amount: number;
            };
          };
        }[];
      };
      orderLineQuantity: {
        unitOfMeasurement: string;
        amount: string;
      };
      statusDate: number;
      orderLineStatuses: {
        orderLineStatus: {
          status: string;
          subSellerId: string | null;
          statusQuantity: {
            unitOfMeasurement: string;
            amount: string;
          };
          cancellationReason: string | null;
          trackingInfo: any;
          returnCenterAddress: any;
        }[];
      };
      refund: any;
      fulfillment: {
        fulfillmentOption: string;
        shipMethod: string;
        storeId: string | null;
        pickUpDateTime: number;
        pickUpBy: any;
        shippingProgramType: string;
        shippingSLA: string;
        shippingConfigSource: string;
      };
    }[];
  };
  shipNode: {
    type: string;
  };
}

export { WalmartOrderType };
