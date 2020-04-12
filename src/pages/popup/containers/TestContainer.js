import { connect } from 'react-redux'
import React, { Component } from 'react'
import store from '../../background/store';
import { fetchStreams } from '../../../modules/webAPIs';
import { CLIENT_ID } from '../../../env.json';
import { selectStreams } from '../../background/reducers/fetchStreams';
import { bindActionCreators } from 'redux';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { streams, onfetchStreams } = this.props;
        return <div> 
            <button onClick={ () => onfetchStreams([144360146]) }>FetchStreams</button>
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
    onfetchStreams: (userIds) => fetchStreams(userIds)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TestContainer)