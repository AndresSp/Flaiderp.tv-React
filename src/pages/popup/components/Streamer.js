import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Streamer = ({streamer, index}) => {

    return <Draggable key={streamer.toString()} draggableId={streamer.toString()} index={index}>
        {(provided) => (
            <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ padding: '10px',
                backgroundColor: 'lightblue',
                border: '1px black solid',
                fontWeight: 'bold',
                ...provided.draggableProps.style }}>
            {streamer}
            </div>
        )}
    </Draggable>
}

export default Streamer