class DefaultController {
  constructor({ service }) {

  }
}

class DefaultService {

}

class Server {
  controller
  app
  server

  constructor({ controller }) {
    this.controller = controller
    this.app = express()
    this.app.get('/', this.controller)
  }

  listen(puerto) { this.server = this.app.listen() }
  close() { this.server.close() }
}

// dependencias
const dependencias = {
  ['Server']: {
    controller: DefaultController
  },
  ['DefaultController']: {
    service: DefaultService
  }
}

// index - factory
class Factory {
  static create(theClass) {

    const objDep = {}

    const classDependencias = dependencias[theClass.name]
    for (const dep in classDependencias) {
      objDep[dep] = this.create(classDependencias[dep])
    }

    const controller = this.create(objDep)

    return new theClass()
  }
}

// main
const server = Factory.create(Server)
server.listen(8080)