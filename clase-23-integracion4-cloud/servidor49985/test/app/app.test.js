import supertest from 'supertest'
import { clearDb, connectDb, disconnectDb } from '../../src/database/mongodb.js'
import { App } from '../../src/app/app.js'
import TestAgent from 'supertest/lib/agent.js'
import { expect } from 'chai'

const TEST_DB_CNX_STR = 'mongodb://localhost:27017/users-test'

const mockRegisterUserData = {
  username: 'test_username',
  password: 'test_password',
  fullName: 'test_fullname',
  email: 'test@email.com'
}

describe('servidor', () => {

  before(async function () {
    await connectDb(TEST_DB_CNX_STR)
    this.app = new App()
    const port = await this.app.connect()
    this.baseURL = `http://localhost:${port}`
    this.httpClient = supertest(this.baseURL)
  })

  // beforeEach(async function () {

  // })

  afterEach(async function () {
    await clearDb()
  })

  after(async function () {
    await this.app.disconnect()
    await disconnectDb()
  })

  describe('/api/users/current', () => {
    describe('dado un usuario registrado y autenticado', () => {
      it('devuelve los datos del usuario', async function () {
        /** @type {TestAgent} client */
        const client = supertest.agent(this.baseURL)
        const { body: { payload: registrado } } = await client
          .post('/api/users')
          .send(mockRegisterUserData)

        const { status, body } = await client
          .get('/api/users/current')

        expect(status).to.equal(200)
        expect(body.payload).not.to.be.undefined
        expect(body.payload).to.haveOwnProperty('_id', registrado._id)
      })
    })
  })
})