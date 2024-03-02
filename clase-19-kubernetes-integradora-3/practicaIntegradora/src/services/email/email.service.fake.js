import { EMAIL_USER } from '../../config/config.js'

class FakeEmailService {

  async send(destinatario, asunto, mensaje, adjuntos = []) {
    const emailOptions = {
      from: EMAIL_USER,
      to: destinatario,
      subject: asunto,
      text: mensaje
    }

    if (adjuntos.length > 0) {
      emailOptions.attachments = adjuntos
    }

    console.log(JSON.stringify(emailOptions, null, 2))
  }
}

export const fakeEmailService = new FakeEmailService()