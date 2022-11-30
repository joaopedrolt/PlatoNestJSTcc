import * as mongoose from 'mongoose'

export const TruckSchema = new mongoose.Schema({
    model: { type: String, unique: false },
    plateNumber: { type: String, unique: true },
    axle: { type: String, unique: false },
    maxcapacity: { type: Number, unique: false },
    status: { type: Boolean, unique: false },
    orderid: { type: String, unique: true }
}, {timestamps: false, collection: 'trucks'});