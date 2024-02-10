import { getDaoTiendas } from '../daos/tiendas/tiendas.dao.js'
import { getEmailService } from './email/email.service.js'
import { juguetesService } from './juguetes.service.js'
import { NewslettersService } from './newsletters.service.js'
import { getSmsService } from './sms/sms.service.js'
import { TiendasService } from './tiendas.service.js'
import { UsuariosService } from './usuarios.service.js'
import { getDaoUsuarios } from '../daos/usuarios/usuarios.dao.js'
import { getDaoJuguetes } from '../daos/juguetes/juguetes.dao.js'
import { getDaoSuscriptores } from '../daos/suscriptores/suscriptores.dao.js'

const tiendasDao = getDaoTiendas()
const emailService = getEmailService()
export const tiendasService = new TiendasService({ tiendasDao, juguetesService })

const suscriptoresDao = getDaoSuscriptores()
export const newslettersService = new NewslettersService({ suscriptoresDao, emailService })

const smsService = getSmsService()
const usuariosDao = getDaoUsuarios()
const juguetesDao = getDaoJuguetes()
export const usuariosService = new UsuariosService({ smsService, usuariosDao, juguetesDao })