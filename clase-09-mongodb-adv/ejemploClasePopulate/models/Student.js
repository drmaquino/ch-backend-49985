import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const studentCollection = 'students'

const studentSchema = new Schema({
    _id: { type: String, default: randomUUID },
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses: [{ type: String, ref: 'courses' }],
}, {
    strict: 'throw',
    versionKey: false
})

studentSchema.pre('find', function (next) {
    this.populate('courses')
    next()
})

export const Student = model(studentCollection, studentSchema)
