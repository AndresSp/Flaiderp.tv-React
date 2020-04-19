import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { DndItemTypes, DndContainerTypes } from '../../../shared/DnDTypes';
import { disableStreamer } from '../../../shared/actions/config';

const Streamers = ({children, configKey, title}) => {
    
    return <Droppable droppableId={configKey}>
        {provided => (
            <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: 'lightgreen',
                padding: '10px',
                minHeight: '50px',
                ...provided.droppableProps.style }}>
                <span style={{color: 'red', fontWeight: 'bold'}}>{title}</span>
                {children}
                {provided.placeholder}
            </div>
            )}
    </Droppable>
}

export default Streamers