import { connect } from 'react-redux'
import React, { Component } from 'react'
import store from '../../background/store';
import { fetchStreams } from '../../../modules/webAPIs';
import { CLIENT_ID } from '../../../env.json';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { streams, fetchStreams } = this.props;
        
        return <div> 
            <button onClick={fetchStreams}>FetchStreams</button>
            {
                streams.map(stream => <div key={stream.id}>{stream.title}</div>) 
            } 
            </div>
    }
}

const mapStateToProps = state => ({
    streams: state.getStreams.streams
})

const mapDispatchToProps = dispatch => ({
    fetchStreams: () => fetchStreams(dispatch, [44445592])
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)