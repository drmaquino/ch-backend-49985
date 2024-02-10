import { SessionsService } from '../../src/services/sessions.service.js'
import { faker } from '@faker-js/faker'

const mockUser = {
  email: 'coderUser',
  password: '123'
}

const mockUsers = []
for (let i = 0; i < 100; i++) {
  mockUsers.push({
    email: faker.internet.email(),
  })
}

const usersDaoMock = {
  readOne: async ({ email }) => {
    if (email === 'coderUser') {
      return mockUser
    }
    return Promise.reject(new Error('NOT FOUND'))
  },
  readMany: async ({ }) => {
    return mockUsers
  }
}

const sessionsService = new SessionsService(usersDaoMock)


async function pruebaLoginSinNombreDeUsuarioFalla() {

  const credentials = {
    email: '',
    password: 'abc123'
  }

  let errorMessage

  try {
    await sessionsService.login(credentials)
    throw new Error('deberia haber lanzado un error pero no lo lanzó')
  } catch (error) {
    errorMessage = error.message
  }

  if (errorMessage === 'error de autenticacion') {
    console.log('Login Sin Nombre de Usuario Falla')
  } else {
    console.log('el error no es el esperado. se lanzó el siguiente error: ' + errorMessage)
  }
}

async function pruebaLoginSinContraseniaFalla() {

  const credentials = {
    email: 'marian',
    password: ''
  }

  let errorMessage

  try {
    await sessionsService.login(credentials)
    throw new Error('deberia haber lanzado un error pero no lo lanzó')
  } catch (error) {
    errorMessage = error.message
  }

  if (errorMessage === 'error de autenticacion') {
    console.log('Login Sin Contrasenia Falla')
  } else {
    console.log('el error no es el esperado. se lanzó el siguiente error: ' + errorMessage)
  }
}


async function pruebaLoginConUsuarioInexistenteFalla() {

  const credentials = {
    email: 'usuarioinvalido',
    password: 'contraseniainvalida'
  }

  let errorMessage

  try {
    await sessionsService.login(credentials)
    throw new Error('deberia haber lanzado un error pero no lo lanzó')
  } catch (error) {
    errorMessage = error.message
  }

  if (errorMessage === 'error de autenticacion') {
    console.log('Login con Usuario Inexistente Falla')
  } else {
    console.log('el error no es el esperado. se lanzó el siguiente error: ' + errorMessage)
  }
}

async function pruebaLoginConContraseniaIncorrectaFalla() {

  const credentials = {
    email: 'coderUser',
    password: 'contraseniaIncorrecta'
  }

  let errorMessage

  try {
    await sessionsService.login(credentials)
    throw new Error('deberia haber lanzado un error pero no lo lanzó')
  } catch (error) {
    errorMessage = error.message
  }

  if (errorMessage === 'error de autenticacion') {
    console.log('Login con Contraseña Incorrecta Falla')
  } else {
    console.log('el error no es el esperado. se lanzó el siguiente error: ' + errorMessage)
  }
}

async function pruebaLoginConCredencialesValidasDevuelveNuevaSesion() {

  const credentials = {
    email: 'coderUser',
    password: '123'
  }

  let errorMessage

  try {
    const session = await sessionsService.login(credentials)
    if (!session) {
      throw new Error('deberia devolver una sesion pero no la devolvió')
    }
  } catch (error) {
    errorMessage = error.message
  }

  if (!errorMessage) {
    console.log('Login con Credenciales Validas Devuelve Nueva Sesion')
  } else {
    console.log('no se esperaba un error. se lanzó el siguiente error: ' + errorMessage)
  }
}

// await pruebaLoginSinNombreDeUsuarioFalla()
// await pruebaLoginSinContraseniaFalla()
// await pruebaLoginConUsuarioInexistenteFalla()
// await pruebaLoginConContraseniaIncorrectaFalla()
// await pruebaLoginConCredencialesValidasDevuelveNuevaSesion()

console.log(mockUsers)