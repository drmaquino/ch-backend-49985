const productos = [
    {
        id: 1,
        nombre: 'silla',
        desc: 'es una silla'
    },
    {
        id: 2,
        nombre: 'mesa',
        desc: 'es una mesa'
    },
    {
        id: 3,
        nombre: 'placard',
        desc: 'es un placard'
    }
]

const carritos = [
    {
        id: 1,
        prods: [
            {
                prod: 1,
                cant: 1,
            },
            {
                prod: 2,
                cant: 4,
            },
            {
                prod: 3,
                cant: 1,
            }
        ]
    },
    {
        id: 2,
        prods: [
            {
                prod: 1,
                cant: 5,
            }

        ]
    }
]

// si busco el carrito 1, quiero ver:
const p = {
    id: 1,
    prods: [
        {
            cant: 1,
            prod: {
                id: 1,
                nombre: 'silla',
                desc: 'es una silla'
            }
        }
    ]
}

// NO QUIERO HACER ESTO!!!
// const carr = carritos.findById(1)
// const tempProds = {}
// for (let i = 0; i < carr.prods.length; i++) {
//     const idProd = carr.prods[i].prod
//     if (tempProds[carr.prods[i]]) {
//         tempProds[carr.prods[i]] = productos.findById(idProd)
//     }
//     carr.prods[i] = tempProds[carr.prods[i]] //.....
// }
// NO QUIERO HACER ESTO!!!