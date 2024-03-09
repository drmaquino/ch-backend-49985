import assert from 'node:assert'
import * as chai from 'chai'
chai.should()

import { UsersService } from '../../src/services/users.service.js'

import { MemoryDao } from '../../src/daos/users.dao.memory.js'
import { fakeEmailService } from '../../src/services/email/email.service.fake.js'
import { hasheadasSonIguales, hashear } from '../../src/utils/criptografia.js'

const password = 'password'
const datosValidosParaCrearUsuario = {
  username: 'username',
  password,
  email: 'email',
  fullName: 'pepe',
}


describe('UsersService', function () {

  beforeEach(function () {
    this.usersDao = new MemoryDao('users')
    this.usersService = new UsersService({
      usersDao: this.usersDao,
      emailService: fakeEmailService,
      criptografia: { hasheadasSonIguales, hashear }
    })
  })

  describe('al registrar con datos validos', function () {
    it('deberia hashear la contraseña', async function () {
      const user = await this.usersService.registrar(datosValidosParaCrearUsuario)
      user.password.should.not.equal(password)
    })
    it('deberia asignarle un _id', async function () {
      const user = await this.usersService.registrar(datosValidosParaCrearUsuario)
      user.should.have.property('_id')
    })
    it('deberia persistir el usuario registrado', async function () {
      const user = await this.usersService.registrar(datosValidosParaCrearUsuario)
      const buscado = await this.usersDao.readOne({ _id: user._id })
      buscado.should.have.property('_id', user._id)
      buscado.should.have.property('username', user.username)
      buscado.should.have.property('password', user.password)
      buscado.should.have.property('email', user.email)
      buscado.should.have.property('fullName', user.fullName)
    })
  })
  describe('al registrar con datos invalidos', function () {
    it('deberia tirar error de datos invalidos', async function () {

      const datosInvalidosParaCrearUsuario = {
        nombre: 'pepe'
      }

      await assert.rejects(this.usersService.registrar(datosInvalidosParaCrearUsuario))
    })
  })
})
