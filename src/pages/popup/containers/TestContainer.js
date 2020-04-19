import { connect } from 'react-redux'
import React, { Component } from 'react'
import { fetchStreams } from '../../../shared/actions/fetchStreams';
import { toggleStatus, setMainStreamer, clearMainStreamer, enableStreamer, disableStreamer, reorderStreamers } from '../../../shared/actions/config';
import { selectStreams } from '../../background/reducers/fetchStreams';
import { selectStreamers, selectStatus, selectMainStreamer, selectEnabledStreamers, selectDisabledStreamers } from '../../background/reducers/config';
import Streamer from '../components/Streamer';
import Streamers from '../components/Streamers';
import { DndContainerTypes } from '../../../shared/DnDTypes';
import { DragDropContext } from 'react-beautiful-dnd';

class TestContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = this.props.config
        console.log(this.state)
    }

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        //const { streamers, onReorderStreamers } = this.props

        const { streamers } = this.state

        console.log(this.state)

        if(!destination){
            return
        }

        if(destination.droppableId === source.droppableId && 
            destination.index === source.index){
                return
            }

        console.log(result)
        //onEnableStreamer(source.droppableId, destination.droppableId, draggableId)
        
        const column = streamers[source.droppableId]
        const streamersId = Array.from(column)
        streamersId.splice(source.index, 1)
        streamersId.splice(destination.index, 0, Number(draggableId))

        this.setState({
            streamers: {
                ...streamers,
                [destination.droppableId]: streamersId
            }
        })  
    }

    render(){
        const { status, mainStreamer, enabledStreamers, disabledStreamers, streams, 
            onToggleStatus, onFetchStreams, onSetMainStreamer, onClearMainStreamer, onEnableStreamer, onDisableStreamer } = this.props;

        const streamers = [ ...mainStreamer,...enabledStreamers, ...disabledStreamers ]

        return <DragDropContext onDragEnd={this.onDragEnd}>
            <div style={{
                backgroundColor: 'orange',
                width: '200px'
                }}> 
                <button onClick={ () => onToggleStatus() }>{ status ? 'Enabled' : 'Disabled' }</button>
                {/* <button onClick={ () => onFetchStreams(enabledStreamers) }>FetchStreams</button> */}
                {
                    streams.map(stream => {
                        return <div key={stream.id}>
                                <div>{stream.title}</div>
                                <hr/>
                            </div>
                    })
                }
                <br></br> 
                <hr></hr>
                <Streamers 
                configKey="main"
                title="Main Streamer:">
                    {this.state.streamers.main.map((streamer, index) => <Streamer key={streamer} streamer={streamer} index={index}></Streamer>)}
                </Streamers>
                <hr></hr>
                <Streamers 
                configKey="enabled"
                title="Enabled Streamers:">
                    {this.state.streamers.enabled.map((streamer, index) => <Streamer key={streamer} streamer={streamer} index={index}></Streamer>)}
                </Streamers>
                <hr></hr>
                <Streamers 
                configKey="disabled"
                title="Disabled Streamers:">
                    {this.state.streamers.disabled.map((streamer, index) => <Streamer key={streamer} streamer={streamer} index={index}></Streamer>)}
                </Streamers>
            </div>
        </DragDropContext>
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        if(JSON.stringify(this.state) !== JSON.stringify(prevState)){
            return this.state
        }

        return null
    }

    componentDidUpdate(prevProps ,prevState, snapshot){

        if(snapshot){
            const { streamers } = this.state
            const { onReorderStreamers } = this.props
            
            console.log(snapshot)
            onReorderStreamers({
                ...streamers
            })
        }
    }
}

const mapStateToProps = state => ({
    config: state.config,
    status: selectStatus(state),
    streamers: selectStreamers(state),
    mainStreamer: selectMainStreamer(state),
    enabledStreamers: selectEnabledStreamers(state),
    disabledStreamers: selectDisabledStreamers(state),
    streams: selectStreams(state),

})

const mapDispatchToProps = dispatch => ({
    onToggleStatus: () => dispatch(toggleStatus()),
    onFetchStreams: (streamers) => dispatch(fetchStreams(streamers)),
    onReorderStreamers: (streamers) => dispatch(reorderStreamers(streamers)),
    onSetMainStreamer: (source, target, streamerId) => dispatch(setMainStreamer(source, target, streamerId)),
    onClearMainStreamer: () => dispatch(clearMainStreamer()),

    onEnableStreamer: (source, target, streamerId) => dispatch(enableStreamer(source, target,streamerId)),
    onDisableStreamer: (source, target, streamerId) => dispatch(disableStreamer(source, target,streamerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)