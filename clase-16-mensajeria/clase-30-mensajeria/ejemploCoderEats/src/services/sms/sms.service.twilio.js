import twilio from 'twilio'
import { TWILIO_SMS_NUMBER } from '../../config/config.js'


class SmsServiceTwilio {

  constructor() {
    this.client = twilio()
  }

  async send(destinatario, mensaje) {
    const smsOptions = {
      from: TWILIO_SMS_NUMBER,
      to: destinatario,
      body: mensaje
    }

    await this.client.messages.create(smsOptions)
  }
}

export const twilioSmsService = new SmsServiceTwilio()
