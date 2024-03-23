import nodemailer from 'nodemailer'

export class NodemailerEmailService {

  constructor(config) {
    this.sender = config.sender
    this.transport = nodemailer.createTransport(config.config)
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

    this.transport.sendMail(emailOptions)
  }
}

