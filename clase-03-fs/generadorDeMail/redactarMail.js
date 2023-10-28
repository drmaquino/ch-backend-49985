import fs from 'fs/promises'

function conLaPrimeraEnMayusculas(string) {
  return string[0].toUpperCase() + string.slice(1)
}

async function generarMail(tipo) {

  const rutaPlantilla = `plantilla${conLaPrimeraEnMayusculas(tipo)}.json`
  const json = await fs.readFile(`./mails/${rutaPlantilla}`, 'utf-8')
  const datos = JSON.parse(json)
  console.log(datos.encabezado)
  console.log()
  console.log(datos.contenido)
  console.log()
  console.log(datos.firma)
}

generarMail('promociones')