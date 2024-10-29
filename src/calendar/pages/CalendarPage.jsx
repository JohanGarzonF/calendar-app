import { useEffect, useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessages, localizer } from '../../helpers'
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { useAuthStore, useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [ lastView, setLastView ] = useState( localStorage.getItem('lastview') || 'month' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = user._id === event.user._id

    const style = {
      backgroundColor: isMyEvent ? '#0762ff' : '#465660',
      borderRadius: '10px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    openDateModal()
  }
  
  const onSelect = ( event ) => {
    setActiveEvent( event )
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastview', event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

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
      <FabAddNew />
      <FabDelete />
      
    </>
  )
}