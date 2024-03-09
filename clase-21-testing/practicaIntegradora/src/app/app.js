import express from 'express'
import { engine } from 'express-handlebars'

import { apiRouter } from '../routers/api/api.router.js'
import { webRouter } from '../routers/web/web.router.js'
import { cookies } from '../middlewares/cookies.js'
import { authentication } from '../middlewares/authentication.js'

export class Server {
  #server

  constructor() {

    this.app = express()

    this.app.engine('handlebars', engine())

    this.app.use(cookies)
    this.app.use(authentication)

    this.app.use('/static', express.static('./static'))

    this.app.use('/', webRouter)
    this.app.use('/api', apiRouter)
  }

  connect(port = 8080) {
    return new Promise((resolve, reject) => {
      this.#server = this.app.listen(port, () => {
        resolve(true)
      })
    })
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(err => {
        if (err) return reject(err)
        resolve(true)
      })
    })
  }
}