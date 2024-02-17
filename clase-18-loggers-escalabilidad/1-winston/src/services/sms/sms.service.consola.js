import { logger } from '../../utils/logger.js'

export class SmsServiceConsola {
  constructor() {
  }

  async enviar({ to, message }) {
    logger.info(`to: ${to} - body: ${message}`)
  }
}
