import { connect } from 'react-redux'
import React, { Component } from 'react'
import { selectStreams } from '../../background/reducers/fetchStreams';
import { fetchStreams } from '../../../shared/actions/fetchStreams';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { streams, enabledStreamers, onfetchStreams } = this.props;
        return <div> 
            <button onClick={ () => onfetchStreams(enabledStreamers) }>FetchStreams</button>
            {
                streams.map(stream => <div key={stream.id}>{stream.title}</div>) 
            } 
            </div>
    }
}

const mapStateToProps = state => ({
    enabledStreamers: state.config.streamers.enabled,
    streams: selectStreams(state)
})

const mapDispatchToProps = dispatch => ({
    onfetchStreams: (streamers) => dispatch(fetchStreams(streamers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)