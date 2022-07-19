/**
 * Module dependencies.
 */

import { app } from '../server.js'
import debug from 'debug'
import http from 'http'
import { Server } from 'socket.io'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
const io = new Server()
io.attach(server,  {
  cors: {
    origin: 'http://localhost:3000'
  }
})

let matchedProfiles = []

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on('new-profile-add', (newProfileId) => {
    if(newProfileId && !matchedProfiles.some((profile) => profile.profileId === newProfileId)) {
      matchedProfiles.push({
        profileId: newProfileId,
        socketId: socket.id
      })
    }
    console.log(matchedProfiles)
    io.emit('get-profiles', matchedProfiles)
  })

  socket.on("send-message", (data)=> {
    const receiverId = data.receiverId
    console.log(matchedProfiles, receiverId);
    const profile = matchedProfiles.find((profile) => profile.profileId === receiverId)
    console.log(profile);
    console.log("Sending from socket to : ", receiverId)
    if(profile){
      io.to(profile.socketId).emit("receive-message", data)
    }
  })

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
    matchedProfiles = matchedProfiles.filter((profile) => profile.socketId !== socket.id)
    io.emit('get-profiles', matchedProfiles)
    console.log(matchedProfiles);
  })
});



/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
  console.log(`Listening on ${bind}`)
}
