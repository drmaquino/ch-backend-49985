import { ConsoleLogger, NestMiddleware } from '@nestjs/common'
import { Request } from 'express'

export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res, next) {
    new ConsoleLogger().log({ time: new Date().toLocaleTimeString(), method: req.method, url: req.url })
    next()
  }
}