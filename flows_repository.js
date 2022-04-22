export default function flowRepository() {
    const flows = [
        {
            name: 'Regex Flow',
            available: true,
            playerId: null
        },
        {
            name: 'AP Graves Flow',
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
            name: 'Venta de Hojas Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Questions Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Spam en questions flow',
            available: true,
            playerId: null
        },
        {
            name: 'Spammers Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Melidot Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Misclassified Porn',
            available: true,
            playerId: null
        },
        {
            name: 'OCF Denounces Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Mensajeria Flow',
            available: true,
            playerId: null
        },
        {
            name: 'SCD Moderation Flow',
            available: true,
            playerId: null
        },
        {
            name: 'Items attribute flow',
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