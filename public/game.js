import { mod } from "./utils.js"

export default function createGame() {
    const state = {
        players: {},
        fraudulentos: {},
        screen: {
            width: 25,
            height: 25
        }
    }

    const observers = []

    function start() {
        const frequency = 4000

        setInterval(addFraudulento, frequency)
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)
        const score = 0
        const name = command.name

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            score,
            name
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            score,
            name
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId
        })
    }

    function addFraudulento(command) {
        const fraudulentoId = command ? command.fraudulentoId : Math.floor(Math.random() * 10000000)
        const fraudulentoX = command ? command.fraudulentoX : Math.floor(Math.random() * state.screen.width)
        const fraudulentoY = command ? command.fraudulentoY : Math.floor(Math.random() * state.screen.height)

        state.fraudulentos[fraudulentoId] = {
            x: fraudulentoX,
            y: fraudulentoY
        }

        notifyAll({
            type: 'add-fraudulento',
            fraudulentoId: fraudulentoId,
            fraudulentoX: fraudulentoX,
            fraudulentoY: fraudulentoY
        })
    }

    function removeFraudulento(command) {
        const fraudulentoId = command.fraudulentoId

        delete state.fraudulentos[fraudulentoId]

        notifyAll({
            type: 'remove-fraudulento',
            fraudulentoId: fraudulentoId,
        })
    }

    function movePlayer(command) {
        notifyAll(command)
        
        const acceptedMoves = {
            ArrowUp(player) {
                player.y = mod(state.screen.height, player.y - 1)
            },
            ArrowRight(player) {
                player.x = mod(state.screen.width, player.x + 1)
            },
            ArrowDown(player) {
                player.y = mod(state.screen.height, player.y + 1)
            },
            ArrowLeft(player) {
                player.x = mod(state.screen.width, player.x - 1)
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFraudulentoCollision(playerId)
        }

    }

    function checkForFraudulentoCollision(playerId) {
        const player = state.players[playerId]

        for (const fraudulentoId in state.fraudulentos) {
            const fraudulento = state.fraudulentos[fraudulentoId]
            // console.log(`Checking ${playerId} score ${player.score} and ${fraudulentoId}`)

            if (player.x === fraudulento.x && player.y === fraudulento.y) {
                // console.log(`COLLISION between ${playerId} and ${fraudulentoId}`)
                removeFraudulento({ fraudulentoId: fraudulentoId })
                player.score += 1
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        addFraudulento,
        removeFraudulento,
        state,
        setState,
        subscribe,
        start
    }
}
