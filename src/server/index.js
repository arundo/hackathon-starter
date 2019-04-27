import express from '@supergeneric/express-server'
import api from './api'
 
const app = express()

app.use('/api', api)

app.start()
