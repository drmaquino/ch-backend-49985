import { MODE } from '../../config/config.js'

let smsService

// @ts-ignore
if (MODE === 'prod') {
  const { twilioSmsService } = await import('./sms.service.twilio.js')
  smsService = twilioSmsService
} else {
  const { fakeSmsService } = await import('./sms.service.fake.js')
  smsService = fakeSmsService
}

export { smsService }
