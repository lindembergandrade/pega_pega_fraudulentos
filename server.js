import express from 'express'
import http from 'http'
import createGame from './public/game'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'player2', playerX: 7, playerY: 0 })
game.addPlayer({ playerId: 'player3', playerX: 9, playerY: 0 })
game.addFraudulento({ fraudulentoId: 'fraudulento1', fraudulentoX: 3, fraudulentoY: 3 })
game.addFraudulento({ fraudulentoId: 'fraudulento2', fraudulentoX: 3, fraudulentoY: 5 })

console.log(game.state)

sockets.onconnection('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id ${playerId}`)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})