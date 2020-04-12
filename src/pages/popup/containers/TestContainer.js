import { connect } from 'react-redux'
import React, { Component } from 'react'
import store from '../../background/store';
import { fetchStreams } from '../../../modules/webAPIs';
import { CLIENT_ID } from '../../../env.json';
import { selectStreams } from '../../background/reducers/fetchStreams';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { streams, onfetchStreams } = this.props;

        return <div> 
            <button onClick={onfetchStreams}>FetchStreams</button>
            {
                streams.map(stream => <div key={stream.id}>{stream.title}</div>) 
            } 
            </div>
    }
}

const mapStateToProps = state => ({
    streams: selectStreams(state)
})

const mapDispatchToProps = dispatch => ({
    onfetchStreams: () => fetchStreams(dispatch, [44445592])
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)