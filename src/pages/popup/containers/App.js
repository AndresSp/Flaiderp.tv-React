import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'
import Body from '../components/Body'
import { selectStatus, selectStreamers, selectMainStreamer, selectEnabledStreamers, selectDisabledStreamers } from '../../background/reducers/config'
import { selectStreams } from '../../background/reducers/fetchStreams'
import { selectStreamsBio } from '../../background/reducers/fetchStreamersBio'
import { selectAccessToken } from '../../background/reducers/auth'


class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Fragment>
                <NavBar { ...this.props.status }/>
                <Body { ...this.props }/>
            </Fragment>
        )}
}

const mapStateToProps = state => ({
    config: state.config,
    accessToken: selectAccessToken(state),
    status: selectStatus(state),
    streamers: selectStreamers(state),
    mainStreamer: selectMainStreamer(state),
    // enabledStreamers: selectEnabledStreamers(state),
    // disabledStreamers: selectDisabledStreamers(state),
    streams: selectStreams(state),
    streamersBio: selectStreamsBio(state)
})

export default connect(mapStateToProps, null)(App)