import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeactivateEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice'


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const {
        events,
        activeEvent
    } = useSelector( state => state.calendar )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const setDeactivateEvent = () => {
        dispatch( onDeactivateEvent() )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        // todo: llegar al backend
        if ( calendarEvent._id ) {
            dispatch( onUpdateEvent({ ...calendarEvent }))
        } else {
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }

    const startDeleteEvent = async () => {
        // todo llegar al backend
        dispatch( onDeleteEvent() )
    }

    return {
        //* properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* methods
        setActiveEvent,
        setDeactivateEvent,
        startSavingEvent,
        startDeleteEvent
    }
}