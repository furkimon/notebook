import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Notes from '../notes/Notes'


const Timeline = () => {
    const notes = useSelector(state => state.notes) // to be change with FOLLOWED NOTES
    const {isLoading, user} = useSelector(state => state.auth)
    const [selectedId, setSelectedId] = useState(null)

    return (
        <div className="timeline__container">
            <div className="notes__wrapper">
                <Notes
                    notes={notes}
                    isLoading={isLoading}
                    user={user}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </div>
        </div>
    )
}

export default Timeline
