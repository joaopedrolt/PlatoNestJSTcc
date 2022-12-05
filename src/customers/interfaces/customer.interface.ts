import { Document } from "mongoose";

export interface Customer extends Document {
    _id: string;
    name: string;
    cnpj: string;
    numero: string;
    email: string;
    password: string;
    orders: string[];
}