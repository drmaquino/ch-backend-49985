const ventas = []

export function getController(req, res) {
  console.log('buscar ventas')
  res.json(ventas)
}

export function postController(req, res) {
  console.log('agregar venta')
  const venta = req.body
  console.log(venta)
  ventas.push(venta)
  res.json(venta)
}