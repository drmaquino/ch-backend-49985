import mongoose from 'mongoose'
import { Student } from './models/Student.js'
import { Course } from './models/Course.js'

await mongoose.connect('mongodb://localhost/coderhouse')

console.log(await Student.deleteMany({}))
console.log(await Course.deleteMany({}))

const estudiante = await Student.create({
  first_name: 'Celia',
  last_name: 'Coruño',
  email: 'fasdf@fasdfads',
  gender: 'Female'
})
console.log(estudiante)

const curso = await Course.create({
  title: 'Backend',
  description: 'fasdfadgd',
  difficulty: 10,
  topics: ['js', 'backend'],
  professor: 'Marian'
})
console.log(curso)

// console.log(await Student.find().lean())
// console.log(await Course.find().lean())

console.log(
  await Student.findByIdAndUpdate(
    estudiante._id,
    { $push: { courses: { _id: curso._id } } },
    { new: true })
)

// sin poblar
const estudiantes = await Student.find().lean()

// // con poblar
// const estudiantes = await Student.find()
//   .populate('courses')
//   .lean()

console.log(JSON.stringify(estudiantes, null, 2))

mongoose.connection.close()