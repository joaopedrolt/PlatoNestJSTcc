import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    role: String,
    name: String,
    user: {type: String, unique: true},
    password: String
}, { timestamps: false, collection: 'users' });
