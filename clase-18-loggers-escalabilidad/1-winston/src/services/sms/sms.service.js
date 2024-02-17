import { logger } from '../../utils/logger.js'

import { MODO_EJECUCION, TWILIO_SMS_OPTIONS } from '../../config/config.js'
import { SmsServiceConsola } from './sms.service.consola.js'
import { SmsServiceTwilio } from './sms.service.twilio.js'

let smsService

// @ts-ignore
if (MODO_EJECUCION === 'online') {
  // singleton!
  if (!smsService) {
    smsService = new SmsServiceTwilio(TWILIO_SMS_OPTIONS)
    logger.info('enviando sms a traves de: twilio')
  }
} else {
  smsService = new SmsServiceConsola()
  logger.info('enviando sms a traves de: la consola')
}

export function getSmsService() {
  return smsService
} 
