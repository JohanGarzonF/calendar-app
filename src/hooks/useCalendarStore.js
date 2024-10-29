import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeactivateEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store'
import { calendarApi } from '../api'
import { convertEventsToDateEvents } from '../helpers'
import Swal from 'sweetalert2'


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const {
        events,
        activeEvent
    } = useSelector( state => state.calendar )
    const { user } = useSelector( state => state.auth )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const setDeactivateEvent = () => {
        dispatch( onDeactivateEvent() )
    }

    const startSavingEvent = async ( calendarEvent ) => {
        console.log({ calendarEvent })
        try {
            if ( calendarEvent.id ) {
                //actualizado
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent).then(() => {
                    dispatch( onUpdateEvent({ ...calendarEvent, user }))
                })
                return
            }
            //creado
            const { data } = await calendarApi.post('/events', calendarEvent )
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }) )
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }`).then(() => {
                dispatch( onDeleteEvent() )
            })
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents( data.events )
            dispatch( onLoadEvents( events ) )
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
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
        startDeleteEvent,
        startLoadingEvents
    }
}