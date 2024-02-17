import { logger } from '../../utils/logger.js'

import twilio from 'twilio'

export class SmsServiceTwilio {
  constructor({ sid, authToken, origin }) {
    this.client = twilio(sid, authToken)
    this.origin = origin
  }

  async enviar({ to, message }) {
    const info = await this.client.messages.create({
      from: this.origin,
      to,
      body: message,
    })
    logger.info(info)
  }
}
