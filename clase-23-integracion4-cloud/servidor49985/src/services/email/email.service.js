import { NODE_ENV, NODEMAILER_CONFIG } from '../../config/config.js'
import { NodemailerEmailService } from './email.service.gmail.js'
import { FakeEmailService } from './email.service.fake.js'

let emailService

if (NODE_ENV === 'production') {
  emailService = new NodemailerEmailService(NODEMAILER_CONFIG)
} else {
  emailService = new FakeEmailService({ sender: 'test user' })
}

export { emailService }
