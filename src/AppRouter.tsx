import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CommandsContext as MainContext } from './contex'
import { routes } from './routes/routes'



function AppRouter() {

  const [commands, setCommands] = useState<{ name: string, series_of_victories: number, count: number }[]>([
    {
      name: '',
      series_of_victories: 0,
      count: 0
    }
  ])

  const [settings, setSettings] = useState<{ defaultTime: number, additionalTime: number, password: string }>({
    defaultTime: 60,
    additionalTime: 30,
    password: ''
  })

  const [whoMove, setWhoMove] = useState<number>(0)
  const [numberQuestion, setNumberQuestion] = useState<number>(1)

  return (
    <MainContext.Provider value={{ commands, setCommands, settings, setSettings, whoMove, setWhoMove, numberQuestion, setNumberQuestion }}>
      <div className='layout'>
        <BrowserRouter>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </MainContext.Provider>
  )
}

export default AppRouter
