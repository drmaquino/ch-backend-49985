import nodemailer from 'nodemailer'

export class EmailServiceNodemailer {
  constructor(options) {
    this.origin = options.auth.email
    this.transporter = nodemailer.createTransport(options)
  }

  async enviar({ to, subject, html }) {
    await this.transporter.sendMail({
      from: this.origin,
      to,
      subject,
      html
    })
  }
}
