import cluster from "node:cluster"
import { cpus } from "node:os"
import { levantarServidor } from './app.js'

cluster.schedulingPolicy = cluster.SCHED_RR

const PORT = 8080
const CANT_PROCS = cpus().length

if (cluster.isPrimary) {
  console.log(`proceso cluster: ${process.pid}`)
  console.log(`trabajando con ${CANT_PROCS} procesadores`)
  for (let i = 0; i < CANT_PROCS; i++) {
    cluster.fork()
  }
  cluster.on('exit', worker => {
    console.log(`${worker.process.pid} acaba de cerrarse`)
    cluster.fork()
  })

} else {
  console.log(`proceso worker: ${process.pid}`)
  levantarServidor(PORT)
}
