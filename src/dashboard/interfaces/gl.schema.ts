import * as mongoose from 'mongoose'

export const GlSchema = new mongoose.Schema({
    yield: Number,
    deliveries: Number
}, {timestamps: false, collection: 'gldashboard'});