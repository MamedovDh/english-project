import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommandsContext } from '../contex'
import { QUESTIONS } from '../questions'


function Question() {

	const { commands, setCommands, settings, numberQuestion, setNumberQuestion, whoMove, setWhoMove } = useContext<any>(CommandsContext)

	const [visibleQuestion, setVisibleQuestion] = useState(true)
	const [lastAnswer, setLastAnswer] = useState(false)
	const [timer, setTimer] = useState(settings.defaultTime + settings.additionalTime * Number(commands[whoMove].series_of_victories >= 1))

	const navigate = useNavigate()

	useEffect(() => {
		let interval: any
		if (visibleQuestion) {
			interval = setInterval(() => {
				if (timer > 0) {
					setTimer(timer - 1)
				} else {
					setVisibleQuestion(false)
					setLastAnswer(false)
					setNumberQuestion(numberQuestion + 1)
					setWhoMove(whoMove === commands.length - 1 ? 0 : whoMove + 1)
				}
			}, 1000)
			return () => clearInterval(interval)
		} else {
			clearInterval(interval)
		}
	}, [commands.length, numberQuestion, setNumberQuestion, setWhoMove, timer, visibleQuestion, whoMove])

	const answer = (variant: string) => {
		if (variant === QUESTIONS[numberQuestion - 1].answer) {
			setCommands(commands.map((command: any, index: number) => {
				if (index === whoMove) {
					return {
						name: command.name,
						series_of_victories: command.series_of_victories + 1,
						count: command.count + 1
					}
				}
				return command
			}))
			setLastAnswer(true)
		} else {
			setCommands(commands.map((command: any, index: number) => {
				if (index === whoMove) {
					return {
						name: command.name,
						series_of_victories: 0,
						count: command.count
					}
				}
				return command
			}))
			setLastAnswer(false)
		}
		setVisibleQuestion(false)
	}

	const nextQuestion = () => {
		const nextWhoMove = whoMove === commands.length - 1 ? 0 : whoMove + 1
		setTimer(settings.defaultTime + settings.additionalTime * Number(commands[nextWhoMove].series_of_victories >= 1))
		setWhoMove(nextWhoMove)
		setVisibleQuestion(true)
		if (QUESTIONS.length === numberQuestion) {
			navigate('/results')
		}
		setNumberQuestion(numberQuestion + 1)
	}

	const timeWrap = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = time % 60
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	return (
		<div className='wrap-timer'>

			<button className='button stop-game' onClick={() => navigate('/result')}>
				Finish the game
			</button>

			<div className="tabel">
				<table>
					<thead>
						<tr>
							<th>Team</th>
							<th>Points</th>
							<th>Series</th>
						</tr>
					</thead>
					<tbody>
						{commands.map((command: any, index: number) => (
							<tr key={index}>
								<td>{command.name}</td>
								<td>{command.count}</td>
								<td>{command.series_of_victories}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='timer'>{timeWrap(timer)}</div>
			<div className='card'>
				{visibleQuestion ?
					<>
						<h2>The <i>{commands[whoMove].name} team's question</i></h2>
						<h3>{numberQuestion}. {QUESTIONS[numberQuestion - 1].question}</h3>
						<div className='line' />
						{QUESTIONS[numberQuestion - 1].variants.map((variant: string) => (
							<button onClick={() => answer(variant)} className='button'>
								{variant}
							</button>
						))}
					</>
					: <>
						<h2>{timer !== 0 ? (lastAnswer ? 'Correctly' : 'Wrong') : 'Time\'s up'}!</h2>
						<h3>{numberQuestion}. {QUESTIONS[numberQuestion - 1].question}</h3>
						<div className='line' />
						{QUESTIONS[numberQuestion - 1].variants.map((variant: string) => (
							<button disabled className='button' style={{ color: variant === QUESTIONS[numberQuestion - 1].answer ? '#5ef330' : '#f33535', borderColor: variant === QUESTIONS[numberQuestion - 1].answer ? 'rgb(94,243,48, 0.5)' : 'rgba(243,53,53, 0.5)' }}>
								{variant}
							</button>
						))}
						<div className='line' />
						<button onClick={nextQuestion} className='button'>
							Continue
						</button>
					</>
				}
			</div>
		</div>
	)
}

export default Question
