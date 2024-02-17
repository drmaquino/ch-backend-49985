import { logger } from '../../utils/logger.js'

export class EmailServiceConsola {
  constructor() {
  }

  async enviar({ to, subject, html }) {
    logger.info(`to: ${to} - subject: ${subject} - html: ${html}`)
  }
}
