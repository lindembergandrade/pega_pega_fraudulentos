export function setupScreen(canvas, game) {
    const { screen: { width, height } } = game.state
    canvas.width = width
    canvas.height = height
}

export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    const { screen: { width, height } } = game.state
    context.clearRect(0, 0, width, height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'grey'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fraudulentoId in game.state.fraudulentos) {
        const fraudulento = game.state.fraudulentos[fraudulentoId]
        context.fillStyle = 'red'
        context.fillRect(fraudulento.x, fraudulento.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if (currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }

    updateScoreTable(scoreTable, game, currentPlayerId)

    requestAnimationFrame(() => {
        renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId)
    })
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
    const maxResults = 15

    let scoreTableInnerHTML = `
        <tr class="header">
            <td>Top 15 Jogadores</td>
            <td>Pontos</td>
        </tr>
    `

    const playersArray = []

    for (let socketId in game.state.players) {
        const player = game.state.players[socketId]
        playersArray.push({
            playerId: socketId,
            x: player.x,
            y: player.y,
            score: player.score,
            name: player.name
        })
    }

    const playersSortedByScore = playersArray.sort((first, second) => {
        if (first.score < second.score) {
            return 1
        }

        if (first.score > second.score) {
            return -1
        }

        return 0
    })

    const topScorePlayers = playersSortedByScore.slice(0, maxResults)

    scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
        return stringFormed + `
            <tr ${player.playerId === currentPlayerId ? 'class="current-player"' : ''}>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `
    }, scoreTableInnerHTML)

    const currentPlayerFromTopScore = topScorePlayers[currentPlayerId]

    if (currentPlayerFromTopScore) {
        scoreTableInnerHTML += `
            <tr class="current-player bottom">
                <td class="socket-id">${currentPlayerFromTopScore.id} EU </td>
                <td class="score-value">${currentPlayerFromTopScore.score}</td>
            </tr>
        `
    }

    scoreTable.innerHTML = scoreTableInnerHTML
}
