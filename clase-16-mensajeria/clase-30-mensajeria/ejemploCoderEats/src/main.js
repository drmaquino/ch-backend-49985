import { app } from './app/app.js'
import { PORT } from './config/config.js'

app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })