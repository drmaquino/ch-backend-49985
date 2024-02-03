export class SmsServiceConsola {
  constructor() {
  }

  async enviar({ to, message }) {
    console.log(`to: ${to} - body: ${message}`)
  }
}
