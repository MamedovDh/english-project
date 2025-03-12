import { useContext } from 'react'
import { CommandsContext } from '../contex'


function Results() {

	const { commands } = useContext(CommandsContext)

	const maxCount = Math.max(...commands.map((command: any) => command.count))
	const winners: any[] = []

	for (const command of Object.values(commands)) {
		if (command.count === maxCount)
			winners.push(command)
	}

	return (
		<div className='card'>
			{winners.length === 1
				? <h2>Team <i>{winners[0].name}</i> won by {maxCount} points</h2>
				: <h2>The team's won <i>{winners.map((command: any) => command.name).join(' ')}</i> bu scoring {maxCount} points</h2>
			}
			Всем спасибо за участие!
		</div>
	)
}


export default Results
