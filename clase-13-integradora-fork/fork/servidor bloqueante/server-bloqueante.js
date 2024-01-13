import express from 'express'

const calculo = () => {
    let sum = 0
    for (let i = 0; i < 6e9; i++) {
        sum += i
    }
    return sum
}

let visitas = 0

const app = express()

app.get('/', (req, res) => {
    res.send('Ok ' + (++visitas))
})

app.get('/calcular', (req, res) => {
    const sum = calculo()
    res.send(`La suma es ${sum}`)
})

const PORT = 8080
app.listen(PORT, err => {
    if (err) throw new Error(`Error en servidor: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})