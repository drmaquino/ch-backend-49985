import fs from 'fs/promises'

// CRUD
async function main() {

  try {
    // Create (crear)
    // si no existe, lo crea
    // await fs.writeFile('archivo.txt', 'hola mundo')

    // Read (leer)
    const texto = await fs.readFile('archivo.txt', 'utf-8')
    console.log(texto)

    // Update (actualizar)
    // si ya existe, lo pisa
    await fs.writeFile('archivo.txt', 'hola gente')

    // agrega al final, si no existe lo crea
    await fs.appendFile('archivo.txt', '!!!\n')
    await fs.appendFile('archivo.txt', `${new Date().toISOString()}: operacion exitosa\n`)

    // Delete (borrar)
    await fs.unlink('archivo.txt')
    console.log('trabajo con archivos finalizado')

  } catch (error) {
    // console.log(error.code)
    if (error.code === 'ENOENT') {
      // manejo el error particular
      console.log('"archivo.txt" no existe!!')
    } else {
      console.log(error)
    }
  }
}

main()
console.log('terminé')