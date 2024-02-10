import { Suscriptor } from '../models/suscriptor.model.js'

export class NewslettersService {

  constructor({ suscriptoresDao, emailService }) {
    this.emailService = emailService
    this.suscriptoresDao = suscriptoresDao
  }

  async suscribirse({ email }) {
    const suscriptor = new Suscriptor({ email })
    await this.suscriptoresDao.create(suscriptor.toPOJO())
    await this.emailService.enviar({ to: email, subject: 'suscripcion exitosa', html: 'suscripto!' })
  }

  async desuscribirse({ email }) {
    await this.suscriptoresDao.deleteOne({ email })
    await this.emailService.enviar({ to: email, subject: 'desuscripcion exitosa', html: 'desuscripto!' })
  }

  async enviar() {
    const suscriptores = await this.suscriptoresDao.readMany()
    for (const suscriptor of suscriptores) {
      await this.emailService.enviar({ to: suscriptor.email, subject: 'novedades!', html: 'bla bla bla...' })
    }
  }
}