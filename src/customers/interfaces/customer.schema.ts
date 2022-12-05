import * as mongoose from 'mongoose'

export const CustomerSchema = new mongoose.Schema({
    name: String,
    cnpj: { type: String, unique: true },
    numero: String,
    email: String,
    password: String,
    orders: [String]
}, { timestamps: false, collection: 'customers' });
