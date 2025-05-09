import Joi from "joi";

export const fetchRatesSchema = Joi.object({
  origin: Joi.string().required().label("Origin"),
  destination: Joi.string().required().label("Destination"),
  weight: Joi.number().positive().required().label("Weight"),
}).required();

export const createLabelSchema = Joi.object({
  orderId: Joi.string().required().label("Order ID"),
  carrier: Joi.string().required().label("Carrier"),
  service: Joi.string().required().label("Service"),
}).required();

export const markShippedSchema = Joi.object({
  orderId: Joi.string().required().label("Order ID"),
  trackingNumber: Joi.string().required().label("Tracking Number"),
  carrier: Joi.string().required().label("Carrier"),
}).required();
