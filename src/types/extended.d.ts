import { Request } from "express";

interface ExtendedRequest extends Request {
    token?: string;
}

export interface Body {
  boxWeightUnit?: string;
  boxLength?: number;
  boxWidth?: number;
  boxHeight?: number;
  boxWeight?: number;
  boxDimensionUnit?: string;
  fromPostalCode?: string;
  fromCountryCode?: string;
  fromAddressLines?: string[];
  fromCity?: string;
  fromState?: string;
  toPostalCode?: string;
  toCountryCode?: string;
  toAddressLines?: string[];
  toCity?: string;
  toState?: string;
  packageType?: string;
  shipByDate?: string;
  deliverByDate?: string;
}