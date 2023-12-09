import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    name: String,
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    price: Number,
    quantity: Number,
    date: Date
}, {
    strict: 'throw',
    versionKey: false
})

export const Order = mongoose.model(orderCollection, orderSchema)
