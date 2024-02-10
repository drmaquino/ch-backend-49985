import { SiglasService } from './siglas.service.js'

const siglasService = new SiglasService()

function si_no_hay_palabras_no_se_genera_ninguna_sigla() {
  const sigla = siglasService.generar('')
  if (sigla === null) {
    console.log('test OK')
  } else {
    console.log('test ERROR: si no hay palabras debería devolver null')
  }
}

function si_hay_una_sola_palabra_devuelve_la_inicial_en_mayusculas_y_un_punto() {
  const sigla = siglasService.generar('coder')
  if (sigla === 'C.') {
    console.log('test OK')
  } else {
    console.log('test ERROR: si hay una sola palabra debería devolver la inicial en mayusculas y un punto')
  }
}

function si_hay_muchas_palabras_devuelve_las_iniciales_en_mayusculas_separadas_por_puntos() {
  const sigla = siglasService.generar('coder house')
  if (sigla === 'C.H.') {
    console.log('test OK')
  } else {
    console.log('test ERROR: si hay muchas palabras debería devolver las iniciales en mayusculas separadas por puntos')
  }
}

si_no_hay_palabras_no_se_genera_ninguna_sigla()
si_hay_una_sola_palabra_devuelve_la_inicial_en_mayusculas_y_un_punto()
si_hay_muchas_palabras_devuelve_las_iniciales_en_mayusculas_separadas_por_puntos()