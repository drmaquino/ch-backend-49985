import { app } from './app/app.js'
import { PORT } from './config/config.js'
import { connect } from './database/database.js'

await connect()
app.listen(PORT)