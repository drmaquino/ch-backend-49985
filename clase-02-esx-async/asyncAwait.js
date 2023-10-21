function randInt(max) {
  return Math.random() * max
}

function tareaQueNoSeCuantoTarda(tarea) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${tarea}`)
      resolve(true)
    }, randInt(3) * 1000)
  })
}



async function arrancarElDia(nombre) {
  await tareaQueNoSeCuantoTarda(nombre + ': 1 pedir nombre')
  await tareaQueNoSeCuantoTarda(nombre + ': 2 buscar en la db al usuario')
  await tareaQueNoSeCuantoTarda(nombre + ': 3 extraer su lista de amigos')
  await tareaQueNoSeCuantoTarda(nombre + ': 4 buscar en la db a sus amigos')
  await tareaQueNoSeCuantoTarda(nombre + ': 5 extraer los gustos en comun de sus amigos')
  await tareaQueNoSeCuantoTarda(nombre + ': 6 generar una recomendacion para el usuario en base a los gustos de sus amigos')
  await tareaQueNoSeCuantoTarda(nombre + ': 7 devolver resultado')

  await Promise.all([
    tareaQueNoSeCuantoTarda(nombre + ': mandar mail de confirmacion'),
    tareaQueNoSeCuantoTarda(nombre + ': loguear en un archivo'),
    tareaQueNoSeCuantoTarda(nombre + ': mandar mail al admin si corresponde, en casos especiales'),
  ])
  await tareaQueNoSeCuantoTarda(nombre + ': terminé')
}

arrancarElDia('marian')
// arrancarElDia('edgar')
// arrancarElDia('oriana')

