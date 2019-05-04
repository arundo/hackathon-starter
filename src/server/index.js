import express from '@supergeneric/express-server'
import api from './api'
import http from 'http'
import socketIO from 'socket.io'
import data from './data/data.json'
import { transformRecord } from './data'
 
const app = express()
const httpServer = http.Server(app)
const io = socketIO(httpServer)

let numConnected = 0
let streamInt

io.on('connection', socket => {
  numConnected += 1
  console.log({numConnected})

  socket.on('disconnect', () => {
    console.log('a user just disconnected')
    numConnected -= 1
    console.log({numConnected})
    
    if (numConnected === 0) {
      console.log('this should clear interval')
      clearInterval(streamInt)
      streamInt = null
    }
  })

  socket.on('stream', () => {
    let i = 0
    if (!streamInt) {
      console.log('Streaming New')
      streamInt = setInterval(() => {
        io.emit('stream_in', transformRecord(data[i]) || {})
        i++
      },5000)
    }
  })
})

app.use('/api', api)

// app.start()
httpServer.listen(process.env.PORT || 3000, () => { console.log('listening to 3000') })