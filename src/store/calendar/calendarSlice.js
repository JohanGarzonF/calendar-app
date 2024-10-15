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
        onSetActiveEvent: (state, { payload } ) => {
            state.activeEvent = payload
        },
    }
})

export const { onSetActiveEvent } = calendarSlice.actions
