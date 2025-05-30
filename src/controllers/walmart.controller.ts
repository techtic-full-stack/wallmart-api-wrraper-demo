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
    const { purchaseOrderId } = req.params; // Extract purchaseOrderId from request URL
    const payload = req.body; // Use request body for the payload

    const data = await markOrderShipped(purchaseOrderId, payload, req.token); // Pass purchaseOrderId dynamically

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
    res.json({ success: true, data });
    return;
  } catch (error) {
    handleError(res, {}, "Failed to sync order manually");
    return;
  }
};
