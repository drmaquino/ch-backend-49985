import { randomUUID } from 'node:crypto'
import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


const usersCollection = 'users'

const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    first_name: String,
    last_name: String,
    email: String,
    gender: String
}, {
    strict: 'throw',
    versionKey: false,
    // statics: {
    //     paginate: async function (filter, { limit, page }) {
    //         return await model('users').find(filter).skip((page - 1) * limit).limit(docsPorPag)
    //     }
    // }
})

userSchema.plugin(mongoosePaginate)

export const User = model(usersCollection, userSchema)
