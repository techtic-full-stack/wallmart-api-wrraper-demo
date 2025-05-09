import { Request } from "express";

interface ExtendedRequest extends Request {
    token?: string;
}