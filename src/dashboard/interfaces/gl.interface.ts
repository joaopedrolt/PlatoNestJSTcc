import { Document } from "mongoose";

export interface Gl extends Document {
    yield: number;
    deliveries: number;
}