import http from 'http'
import fs from 'fs/promises'

const pers = { nombre: 'pepe' }

const server = http.createServer(async (request, response) => {
  console.log(request.url)
  switch (request.url) {
    case '/personas':
      response.end(JSON.stringify(pers))
      break
    default:
      const pagina = await fs.readFile('./views/index.html', 'utf-8')
      response.end(pagina)
  }
})

// MAC address: id de la compu, viene de fabrica // no nos interesa
// IP address: id de la compu dentro de una red
// PORT: id de la aplicacion dentro de una compu dentro de una red

// ip + port

server.listen(8080)