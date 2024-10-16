import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
    _id: 123412934,
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

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onDeactivateEvent: ( state ) => {
            state.activeEvent = null
        },
        onSetActiveEvent: (state, { payload } ) => {
            state.activeEvent = payload
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload )
            state.activeEvent = null
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if ( event[ '_id' ] === payload._id ) {
                    return payload
                }
                return event
            })
        },
        onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event._id !== state.activeEvent._id )
                state.activeEvent = null
            }
        }
    }
})

export const {
    onDeactivateEvent,
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent
} = calendarSlice.actions
