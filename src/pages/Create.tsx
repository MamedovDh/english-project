import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommandsContext } from '../contex'

function Create() {

	const { commands, setCommands, settings, setSettings } = useContext<any>(CommandsContext)
	const navigate = useNavigate()

	const commandsList: string[] = Array.from({ length: commands.length }, (_, index) => `Команда ${index + 1}`)

	const addCommand = () => {
		setCommands([...commands, { name: '', series_of_victories: 0, count: 0 }])
	}

	const saveCommands = (e: any) => {
		e.preventDefault()
		const list = []
		console.log(commandsList)

		for (const i of commandsList) {
			list.push({ name: i, series_of_victories: 0, count: 0 })
		}
		console.log(list)
		setCommands(list)
		navigate('/rules')
	}

	return (
		<form onSubmit={e => e.preventDefault()} className='card'>
			<h2>Создание команд</h2>
			{commands.map((command: any, index: number) => (
				<div key={command.name} className='list-commands'>
					<input placeholder='Введите название команды' defaultValue={commandsList[index]} className='input' onChange={(e: any) => commandsList[index] = e.target.value} />
				</div>
			))}
			<div className='line' />

			<div className='wrap'>
				<h4>Пароль</h4>
				<input className='input' placeholder='Введите пароль' value={settings.password} onChange={(e: any) => setSettings({ ...settings, password: e.target.value })} />
			</div>

			<div className='line' />

			<div className='wrap'>
				<h4>Время ответа на вопрос</h4>
				<input placeholder='Введите время в секундах' type='number' className='input' value={settings.defaultTime} onChange={(e: any) => setSettings({ ...settings, defaultTime: Number(e.target.value) })} />
			</div>

			<div className='wrap'>
				<h4>Дополнительное время</h4>
				<input placeholder='Введите время в секундах' className='input' type='number' value={settings.additionalTime} onChange={(e: any) => setSettings({ ...settings, additionalTime: Number(e.target.value) })} name='' />
			</div>

			<div className='line' />

			<button type='button' className='button' onClick={addCommand}>Добавить команду</button>
			<button onClick={saveCommands} className='button'>Сохранить</button>
		</form>
	)
}

export default Create
