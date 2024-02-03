import nodemailer from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from '../../config/config.js'

class GmailEmailService {

  constructor() {
    this.transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    })
  }

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

    await this.transport.sendMail(emailOptions)
  }
}

export const gmailEmailService = new GmailEmailService()
