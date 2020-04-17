import { connect } from 'react-redux'
import React, { Component } from 'react'
import { fetchStreams } from '../../../shared/actions/fetchStreams';
import { toggleStatus, setMainStreamer, clearMainStreamer, enableStreamer, disableStreamer } from '../../../shared/actions/config';
import { selectStreams } from '../../background/reducers/fetchStreams';
import { selectStatus, selectMainStreamer, selectEnabledStreamers, selectDisabledStreamers } from '../../background/reducers/config';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { status, mainStreamer, enabledStreamers, disabledStreamers, streams, 
            onToggleStatus, onFetchStreams, onSetMainStreamer, onClearMainStreamer, onEnableStreamer, onDisableStreamer } = this.props;

        const streamers = [ mainStreamer,...enabledStreamers, ...disabledStreamers ]

        return <div style={{width: '200px'}}> 
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
            Main Streamer:
            {
                <div key={mainStreamer}>{mainStreamer} 
                    {/* <button>Enabled</button> */}
                    <button onClick={ () => onClearMainStreamer() }>Clear</button>
                </div>
            }
            <hr></hr>
            Enabled Streamers:
            {
                enabledStreamers.map(streamer => <div key={streamer}>{streamer} 
                    <button onClick={ () => onDisableStreamer(streamer) }>Disable</button> 
                    <button onClick={ () => onSetMainStreamer('enabled', streamer) }>Main</button>
                    </div>)
            }
            Disabled Streamers:
            {
                disabledStreamers.map(streamer => <div key={streamer}>{streamer} 
                    <button onClick={ () => onEnableStreamer(streamer) }>Enable</button> 
                    <button onClick={ () => onSetMainStreamer('disabled', streamer) }>Main</button>
                    </div>)
            }
            </div>
    }
}

const mapStateToProps = state => ({
    status: selectStatus(state),
    mainStreamer: selectMainStreamer(state),
    enabledStreamers: selectEnabledStreamers(state),
    disabledStreamers: selectDisabledStreamers(state),
    streams: selectStreams(state),

})

const mapDispatchToProps = dispatch => ({
    onToggleStatus: () => dispatch(toggleStatus()),
    onFetchStreams: (streamers) => dispatch(fetchStreams(streamers)),

    onSetMainStreamer: (from, streamerId) => dispatch(setMainStreamer(from, streamerId)),
    onClearMainStreamer: () => dispatch(clearMainStreamer()),

    onEnableStreamer: (streamerId) => dispatch(enableStreamer(streamerId)),
    onDisableStreamer: (streamerId) => dispatch(disableStreamer(streamerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)