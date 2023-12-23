import { hashSync, compareSync, genSaltSync } from 'bcrypt'

export function hashear(frase) {
  return hashSync(frase, genSaltSync(10))
}

export function hasheadasSonIguales(recibida, almacenada) {
  return compareSync(recibida, almacenada)
}