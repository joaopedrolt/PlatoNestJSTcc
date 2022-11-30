import { Document } from "mongoose";

export interface Truck extends Document {
    _id: string;
    model: string;
    plateNumber: string;
    axle: string;
    maxcapacity: number;
    status: boolean;
    orderid?: string;
}