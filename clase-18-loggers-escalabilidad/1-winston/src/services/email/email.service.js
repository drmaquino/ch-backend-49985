import { logger } from '../../utils/logger.js'

import { MODO_EJECUCION, NODEMAILER_GMAIL_OPTIONS } from '../../config/config.js'
import { EmailServiceConsola } from './email.service.consola.js'
import { EmailServiceNodemailer } from './email.service.nodemailer.js'

let emailService

// @ts-ignore
if (MODO_EJECUCION === 'online') {
  // singleton!
  if (!emailService) {
    emailService = new EmailServiceNodemailer(NODEMAILER_GMAIL_OPTIONS)
    logger.info('enviando mails a traves de: gmail')
  }
} else {
  emailService = new EmailServiceConsola()
  logger.info('enviando mails a traves de: la consola')
}

export function getEmailService() {
  return emailService
} 
