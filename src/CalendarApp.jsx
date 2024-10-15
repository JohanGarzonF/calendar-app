import { useState } from 'react'
import { AppRouter } from './router'
import { BrowserRouter } from 'react-router-dom'

export const CalendarApp = () => {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
