import { stat } from "fs"

export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function registerCurrentPlayer(playerId) {
        stat.playerId = playerId
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command)
    }

    return { subscribe, registerCurrentPlayer }
}