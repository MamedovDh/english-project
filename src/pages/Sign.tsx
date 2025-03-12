import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { CommandsContext } from '../contex'

function Sign() {

	const [error, setError] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { settings } = useContext(CommandsContext)
	const navigate = useNavigate()

	const handler = (e: any) => {
		e.preventDefault()
		if (password === settings.password) {
			navigate('/question')
		} else {
			setError('Неверный пароль')
		}
	}

	return (
		<form className='card'>
			<h2>Enter the password</h2>
			<input className='input' type='text' placeholder='Password' value={password} onChange={(e: any) => setPassword(e.target.value)} />
			{error && <p className='error'>{error}</p>}
			<button className='button' onClick={handler}>Sign in</button>
		</form>
	)
}

export default Sign
