import { exec, execFile, spawn, fork } from 'node:child_process'

const forked = fork('child.js')

forked.on('message', msg => {
    if (msg === 'listo') {
        forked.send('comenzar')
    } else {
        console.log(`Mensaje del hijo: ${msg}`)
    }
})
