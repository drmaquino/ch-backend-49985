import mongoose from 'mongoose'
import express from 'express'
import { User } from './models/User.js'
import users from './users.json' assert { type: 'json' }
import { engine } from 'express-handlebars'

await mongoose.connect('mongodb://localhost/coderhouse')
console.log('conectado a mongodb!')

await User.deleteMany({})
await User.insertMany(users)

const app = express()

app.listen(8080, () => { console.log('conectado a puerto 8080!') })

app.engine('handlebars', engine())

app.get('/', async (req, res, next) => {

    const criterioDeBusqueda = {}

    if (req.query.first_name) { criterioDeBusqueda.first_name = req.query.first_name }
    if (req.query.last_name) { criterioDeBusqueda.last_name = req.query.last_name }
    if (req.query.gender) { criterioDeBusqueda.gender = req.query.gender }


    const opcionesDePaginacion = {
        limit: req.query.limit || 5, // tamaño de pagina: 5 por defecto
        page: req.query.page || 1, // devuelve la primera pagina por defecto
        lean: true // para que devuelva objetos literales, no de mongoose
    }

    // @ts-ignore
    const result = await User.paginate(criterioDeBusqueda, opcionesDePaginacion)

    console.log(result)

    res.render('usuarios.handlebars', {
        pageTitle: 'Usuarios',
        hayDocs: result.docs.length > 0,
        ...result,
        // docs: result.docs,
        // limit: result.limit,
        // page: result.page,
        // totalPages: result.totalPages,
        // hasNextPage: result.hasNextPage,
        // nextPage: result.nextPage,
        // hasPrevPage: result.hasPrevPage,
        // prevPage: result.prevPage,
        // pagingCounter: result.pagingCounter,
    })
})
