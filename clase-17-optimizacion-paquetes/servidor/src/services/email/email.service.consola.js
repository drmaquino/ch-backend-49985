export class EmailServiceConsola {
  constructor() {
  }

  async enviar({ to, subject, html }) {
    console.log(`to: ${to} - subject: ${subject} - html: ${html}`)
  }
}
