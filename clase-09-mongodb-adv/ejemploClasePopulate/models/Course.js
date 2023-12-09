import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const courseCollection = 'courses'

const courseSchema = new Schema({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: Number, required: true },
    topics: { type: [String], default: [] },
    professor: { type: String, required: true },
}, {
    strict: 'throw',
    versionKey: false
})

export const Course = model(courseCollection, courseSchema)
