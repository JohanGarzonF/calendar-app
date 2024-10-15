import { useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { getMessages, localizer } from '../../helpers'
import { NavBar, CalendarEvent, CalendarModal } from '../'

const events = [
  {
    title: 'Cumpleaños jefe',
    notes: 'Hay que darle el regalo',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#1aaaad',
    user: {
      _id: '123',
      name: 'Johan'
    }
  }
]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '10px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    localStorage.setItem('lastview', event)
  }

  const onSelect = ( event ) => {
    localStorage.setItem('lastview', event)
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastview', event)
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessages() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />
      <CalendarModal />
    </>
  )
}