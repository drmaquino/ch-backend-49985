import fs from 'fs/promises'
import { Mensaje } from '../models/Mensaje.js'

export class MensajesManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async create(datos) {
    const mensaje = new Mensaje(datos)
    const mensajes = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    mensajes.push(mensaje)
    await fs.writeFile(this.ruta, JSON.stringify(mensajes, null, 2))
    return mensaje
  }

  async findAll() {
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    return personas
  }
}

export const mensajesManager = new MensajesManager('./db/mensajes.json')