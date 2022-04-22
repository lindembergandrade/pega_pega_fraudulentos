export default function flowRepository() {
    const flows = [
        {
            name: 'Regex Flow',
            available: true,
            playerId: null
        },
        {
            name: 'SCD Graves Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Mantika Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Items Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Sherloq Flow',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex5',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex6',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex7',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex8',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex9',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex10',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex11',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex12',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex13',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex14',
            available: true,
            playerId: null
        },
        {
            name: 'AP-Regex15',
            available: true,
            playerId: null
        },
    ]

    function findFlowName(playerId) {
        for (const flow of flows) {
            if (flow.available === true) {
                flow.available = false
                flow.playerId = playerId
                return flow.name
            }
        }
    }

    return { findFlowName }
}