import { JSX } from 'react'
import Create from '../pages/Create'
import NotFound from '../pages/NotFound'
import Question from '../pages/Question'
import Results from '../pages/Results'
import Rules from '../pages/Rules'
import Sign from '../pages/Sign'

interface Route {
	path: string,
	element: JSX.Element
}

export const routes: Route[] = [
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/',
		element: <Create />
	},
	{
		path: 'question',
		element: <Question />
	},
	{
		path: '/sign',
		element: <Sign />
	},
	{
		path: '/rules',
		element: <Rules />
	},
	{
		path: '/result',
		element: <Results />
	}
] 