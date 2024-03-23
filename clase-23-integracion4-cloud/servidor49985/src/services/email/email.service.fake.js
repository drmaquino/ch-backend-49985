import { logger } from '../../utils/logger.js'

export class FakeEmailService {

  constructor(config) {
    this.sender = config.sender
  }

  async send(destinatario, asunto, mensaje, adjuntos = []) {
    const emailOptions = {
      from: this.sender,
      to: destinatario,
      subject: asunto,
      text: mensaje
    }

    if (adjuntos.length > 0) {
      emailOptions.attachments = adjuntos
    }
    logger.debug(JSON.stringify(emailOptions, null, 2))
  }
}
