import express from '@supergeneric/express-server'
import api from './api'
import http from 'http'
import socketIO from 'socket.io'
 
const app = express()
const httpServer = http.Server(app)
const io = socketIO(httpServer)

io.on('connection', socket => console.log('a user is connected'))
io.on('connection', socket => {
  socket.on('msg_in', () => {
    console.log('messsage in')
    io.emit('msg_in', 'something here')
  })
})

app.use('/api', api)

// app.start()
httpServer.listen(3000, () => { console.log('listening to 3000') })