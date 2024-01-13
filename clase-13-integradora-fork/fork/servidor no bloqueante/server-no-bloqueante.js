import express from 'express'
import { fork } from 'node:child_process'

let visitas = 0

const app = express()

app.get('/', (req, res) => {
    res.send('Ok ' + (++visitas))
})

app.get('/calcular', (req, res) => {
    const computo = fork('./scripts/computo.js')
    computo.on('message', msg => {
        if (msg === 'listo') {
            computo.send('calcular!')
        } else {
            res.send(`La suma es ${msg}`)
        }
    })
})

const PORT = 8080
app.listen(PORT, err => {
    if (err) throw new Error(`Error en servidor: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})


