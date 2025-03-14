
import { useNavigate } from 'react-router-dom'
function Rules() {

	const navigate = useNavigate()

	return (
		<div className='card'>
			<h1>Правила</h1>
			<h3>
				Правила:
				⁃ Класс разбит на определенное количество команд, каждая команда придумывает себе название. Команда отвечает на вопрос, когда до нее доходит очередь (вы увидите на экране название своей команды). На вопрос, предназначенный другой команде отвечать нельзя;<br />
				⁃ Команде дается РОВНО минута на раздумья;<br />
				⁃ Команда, отвечающая правильно, получает 1 балл, отвечающая неправильно - 0 баллов;<br />
				⁃ В случае, если команда не успевает дать ответ на вопрос в течение положенного времени, то за этот раунд команда получает «0» баллов, будьте внимательны;<br />
				⁃ В течение игры команда может получить бонус: если команда ответит верно три раунда подряд, то в последующем раунде команда получает бонусное количество времени на размышления;<br />
				⁃ Команда, набравшая большее количество правильных ответов, становится победителем.
			</h3>
			<button className='button' onClick={() => navigate('/sign')}>Go to the game</button>
		</div>
	)
}

export default Rules
