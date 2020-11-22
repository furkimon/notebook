import React, {useState} from 'react'
import { useSelector} from 'react-redux'
import Notes from '../notes/Notes'


const Timeline = () => {
    const {followedNotes} = useSelector(state => state.notes) 
    const [selectedId, setSelectedId] = useState(null)

    return (
        <div className="timeline__container">
            <div className="notes__wrapper">
                <Notes
                    notes={followedNotes}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </div>
        </div>
    )
}

export default Timeline
