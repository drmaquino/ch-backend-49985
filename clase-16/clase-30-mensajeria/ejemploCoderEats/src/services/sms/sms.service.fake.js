import { TWILIO_SMS_NUMBER } from '../../config/config.js'


class SmsServiceTwilio {

  async send(destinatario, mensaje) {
    const smsOptions = {
      from: TWILIO_SMS_NUMBER,
      to: destinatario,
      body: mensaje
    }

    console.log(smsOptions)
  }
}

export const fakeSmsService = new SmsServiceTwilio()
