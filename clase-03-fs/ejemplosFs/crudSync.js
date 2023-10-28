import fs from 'fs'

// CRUD
function main() {

  // Create (crear)
  // si no existe, lo crea
  fs.writeFileSync('archivo.txt', 'hola mundo')

  // Read (leer)
  const texto = fs.readFileSync('archivo.txt', 'utf-8')
  console.log(texto)

  // Update (actualizar)
  // si ya existe, lo pisa
  fs.writeFileSync('archivo.txt', 'hola gente')

  // agrega al final, si no existe lo crea
  fs.appendFileSync('archivo.txt', '!!!\n')
  fs.appendFileSync('archivo.txt', `${new Date().toISOString()}: operacion exitosa\n`)

  // Delete (borrar)
  fs.unlinkSync('archivo.txt')
  console.log('trabajo con archivos finalizado')
}

main()
console.log('terminé')