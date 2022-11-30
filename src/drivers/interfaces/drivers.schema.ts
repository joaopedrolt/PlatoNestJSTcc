import * as mongoose from 'mongoose'

export const DriversSchema = new mongoose.Schema({
    name: String,
    status: Boolean,
    orderid: String
}, {timestamps: false, collection: 'drivers'});