// import 'dotenv/config'

import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program
  .option('-p, --prod', 'entorno de ejecucion', false)
  .option('-l, --lucky-number <num>', 'número de la suerte', '33')
  .requiredOption('-u, --user <user>', 'nombre de usuario')
  .parse()

console.log(program.opts())

const { prod, luckyNumber, user } = program.opts()

// const prod = process.argv.slice(2)[0]

const path = prod ? './src/config/prod.env' : './src/config/dev.env'
dotenv.config({ path })

export const PORT = process.env.PORT
export const MODE = process.env.MODE
export const CNX_STR = process.env.CNX_STR
