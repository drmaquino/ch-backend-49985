// @ts-nocheck
process.on('message', msg => {
    console.log(`mensaje del padre: ${msg}`)
    process.send('terminé')
    process.exit()
})

process.send('listo')
