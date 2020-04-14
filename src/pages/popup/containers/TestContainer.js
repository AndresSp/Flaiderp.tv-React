import { connect } from 'react-redux'
import React, { Component } from 'react'
import { fetchStreams } from '../../../shared/actions/fetchStreams';
import { toggleStatus } from '../../../shared/actions/config';
import { selectEnabledStreamers, selectStatus } from '../../background/reducers/config';
import { selectStreams } from '../../background/reducers/fetchStreams';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { status, streams, enabledStreamers, onToggleStatus, onfetchStreams } = this.props;
        return <div> 
            <button onClick={ () => onToggleStatus() }>{ status ? 'Enabled' : 'Disabled' }</button>
            <button onClick={ () => onfetchStreams(enabledStreamers) }>FetchStreams</button>
            {
                streams.map(stream => <div key={stream.id}>{stream.title}</div>) 
            } 
            </div>
    }
}

const mapStateToProps = state => ({
    status: selectStatus(state),
    enabledStreamers: selectEnabledStreamers(state),
    streams: selectStreams(state)
})

const mapDispatchToProps = dispatch => ({
    onToggleStatus: () => dispatch(toggleStatus()),
    onfetchStreams: (streamers) => dispatch(fetchStreams(streamers))
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)