import supertest from 'supertest'
import * as chai from 'chai'

import { Server } from '../src/app/app.js'
import { connectDb, disconnectDb } from '../src/database/mongodb.js'
import { createMockUserDataWithout } from './utils/test-utils.js'

chai.should()

const password = 'password'
const datosValidosParaCrearUsuario = {
  username: 'username',
  password,
  email: 'email',
  fullName: 'pepe',
}

const TEST_PORT = 9090
const baseURL = `http://localhost:${TEST_PORT}`

const requester = supertest(baseURL)

describe('API Rest', function () {

  this.timeout(20000)

  before(async function () {
    await connectDb()
    this.server = new Server()
    await this.server.connect(TEST_PORT)
  })

  after(async function () {
    await this.server.disconnect()
    await disconnectDb()
  })

  describe('POST /api/users', function () {
    describe('al registrar con datos validos', function () {
      it('deberia devolver el usuario registrado y codigo de estado 201', async function () {

        const { body } = await requester
          .post('/api/users')
          .send(datosValidosParaCrearUsuario)
          .expect(201)

        body.payload.should.not.be.null
      })
    })
    describe('al registrar con datos invalidos', function () {
      it('deberia devolver codigo de estado 400', async function () {
        await requester
          .post('/api/users')
          .send(createMockUserDataWithout('username'))
          .expect(400)
      })
    })
  })
  describe('GET /api/users/current', function () {
    describe('al pedir mis datos estando logueado', function () {
      it('deberia devolver mis datos y codigo de estado 200', async function () {

        const requester = supertest.agent(baseURL)

        await requester
          .post('/api/users')
          .send(datosValidosParaCrearUsuario)

        const { body } = await requester
          .get('/api/users/current')
          .send(datosValidosParaCrearUsuario)
          .expect(200)

        body.payload.should.not.be.null
      })
    })
  })
})
