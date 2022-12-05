import * as mongoose from 'mongoose'

export const OrderSchema = new mongoose.Schema({
    desc: String,
    weight: Number,
    addressin: String,
    cepin: String,
    addressout: String,
    cepout: String,
    status: Boolean,
    statusdesc: String,
    driver: {
        _id: String,
        name: String,
        status: Boolean,
        orderid: String
    },
    truck: {
        _id: String,
        model: String,
        plateNumber: String,
        axle: String,
        maxcapacity: Number,
        status: Boolean,
        orderid: String
    },
    customer: {
        _id: String,
        name: String,
        cnpj: String,
        numero: String,
        email: String,
        password: String,
        orders: [String],
    },
    price: Number,
    distance: String,
    accepted: Boolean,
    finished: Boolean
}, { timestamps: false, collection: 'orders' });
