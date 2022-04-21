export default function createGame() {
    const state = {
        players: {},
        fraudulentos: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const observers = []

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

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        })
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFraudulento(command) {
        const fraudulentoId = command.fraudulentoId
        const fraudulentoX = command.fraudulentoX
        const fraudulentoY = command.fraudulentoY

        state.fraudulentos[fraudulentoId] = {
            x: fraudulentoX,
            y: fraudulentoY
        }
    }

    function removeFraudulento(command) {
        const fraudulentoId = command.fraudulentoId

        delete state.fraudulentos[fraudulentoId]
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1
                }
            },
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
            console.log(`Checking ${playerId} and ${fraudulentoId}`)

            if (player.x === fraudulento.x && player.y === fraudulento.y) {
                console.log(`COLLISION between ${playerId} and ${fraudulentoId}`)
                removeFraudulento({ fraudulentoId })
            }
        }
    }

    return { addPlayer, removePlayer, addFraudulento, removeFraudulento, movePlayer, state, setState, subscribe }
}