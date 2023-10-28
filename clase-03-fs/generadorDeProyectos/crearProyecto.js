import fs from 'fs/promises'

function guionar(string) {
  return string.split(' ').join('-')
}

function crearPackageJson(root, nombreDeProyecto) {
  const pojo = {
    type: 'module',
    name: nombreDeProyecto,
    version: '1.0.0',
    description: '',
    main: 'src/main.js',
    scripts: {},
    author: '',
    license: 'ISC',
  }

  const json = JSON.stringify(pojo, null, 2)
  fs.writeFile(`${root}/package.json`, json)
}

function crearLibJs(root) {
  fs.writeFile(`${root}/src/lib.js`, `// aca van mis funciones
export const HOLA = 'mundo'`)
}

function crearMainJs(root) {
  const contenido = `import lib from './lib.js'`
  fs.writeFile(`${root}/src/main.js`, contenido)
}


async function crearProyecto(nombre) {
  const nombreConGuiones = guionar(nombre)
  await fs.rmdir(nombreConGuiones, { recursive: true })
  await fs.mkdir(nombreConGuiones)
  crearPackageJson(nombreConGuiones, nombreConGuiones)
  await fs.mkdir(`${nombreConGuiones}/src`)
  crearLibJs(nombreConGuiones)
  crearMainJs(nombreConGuiones)
}

crearProyecto('probando fs')