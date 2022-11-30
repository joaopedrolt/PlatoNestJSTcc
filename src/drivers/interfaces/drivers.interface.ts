import { Document } from "mongoose";

export interface Driver extends Document {
    _id: string;
    name: string;
    status: boolean;
    orderid?: string;
}