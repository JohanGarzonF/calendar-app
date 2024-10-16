import { useCalendarStore, useUiStore } from '../../hooks'


export const FabDelete = () => {

    const { hasEventSelected, startDeleteEvent } = useCalendarStore()
    const { isDateModalOpen } = useUiStore()

    const handleDelete = () => {
        startDeleteEvent()
    }

    return (
        <button
            onClick={ handleDelete }
            className='btn btn-danger fab-danger'
            style={{ display: hasEventSelected && !isDateModalOpen ? '' : 'none' }}
            >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}