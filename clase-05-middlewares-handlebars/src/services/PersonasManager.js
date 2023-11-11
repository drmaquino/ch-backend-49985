import fs from 'fs/promises'
import { Persona } from '../models/Persona.js'

export class PersonasManager {
  constructor(ruta) {
    this.ruta = ruta
  }

  async create(datos) {
    const persona = new Persona(datos)
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    personas.push(persona)
    await fs.writeFile(this.ruta, JSON.stringify(personas, null, 2))
    return persona
  }

  async findAll() {
    const personas = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
    return personas
  }
}

export const personasManager = new PersonasManager('./db/personas.json')