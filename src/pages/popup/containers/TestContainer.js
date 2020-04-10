import { connect } from 'react-redux'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { getStreams } from '../../../modules/webAPIs';

class TestContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { streams } = this.props;
        return ( streams.map(stream => <div key={stream.id}>{stream.title}</div>) )
    }
}

const mapStateToProps = state => ({
    streams: state.getStreamStatus.streams
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchStreams: getStreams
}, dispatch)

export default connect(mapStateToProps)(TestContainer)