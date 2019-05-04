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
  console.log('a user just connected')
  console.log({ numConnected })

  socket.on('stream', () => {
    // this is to simulate data streaming from the thermostat every 5 seconds
    if (!streamInt) {
      let i = 0
      console.log('Streaming New')
      streamInt = setInterval(() => {
        if (!data[i]) i = 0
        io.to('streaming').emit('stream_in', transformRecord(data[i]) || {})
        console.log(i)
        i++
      }, 5000)
    }
    socket.join('streaming')
  })
  
  socket.on('end_stream', () => {
    socket.leave('streaming')
    console.log('stream')
  })

  socket.on('disconnect', () => {
    console.log('a user just disconnected')
    numConnected -= 1
    console.log({ numConnected })

    // clear the data streaming simulation when there's no connected user
    if (numConnected === 0) {
      console.log('this should clear interval')
      clearInterval(streamInt)
      streamInt = null
    }
  })
})

app.use('/api', api)

// app.start()
httpServer.listen(process.env.PORT || 3000, () => {
  console.log('listening to 3000')
})
