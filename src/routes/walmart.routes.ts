import { Router } from "express";
import {
  getRates,
  getShippingLabel,
  markShipped,
  syncOrderManually,
  getOrders,
} from "../controllers/walmart.controller";

const router = Router();

router.get("/orders", getOrders);

router.get("/sync-order", syncOrderManually);

router.post("/rates", getRates);

router.post("/create-label", getShippingLabel);

router.post("/mark-shipped/:purchaseOrderId", markShipped);

export default router;
