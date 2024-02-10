export class SiglasService {
  generar(frase) {
    if (!frase) {
      return null
    }

    const sigla = frase
      .split(' ')
      .map(palabra => `${palabra[0].toUpperCase()}.`)
      .join('')

    return sigla
  }
}