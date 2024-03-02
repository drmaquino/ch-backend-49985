import { MODE } from '../../config/config.js'

export class EmailService {

  /**
   * Envia un correo utilizando el transporte correspondiente
   * 
   * @param {string} destinatario 
   * @param {string} asunto 
   * @param {string} mensaje 
   * @param {Array} adjuntos
   */
  async send(destinatario, asunto, mensaje, adjuntos = []) {
    throw new Error('MUST IMPLEMENT IN SUBCLASS')
  }
}

/**
 * @type {EmailService}
 */
let emailService

// @ts-ignore
if (MODE === 'prod') {
  const { gmailEmailService } = await import('./email.service.gmail.js')
  emailService = gmailEmailService
} else {
  const { fakeEmailService } = await import('./email.service.fake.js')
  emailService = fakeEmailService
}

export { emailService }
