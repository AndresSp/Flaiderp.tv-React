import { connect } from 'react-redux'
import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'


class App extends React.PureComponent {
    render(){
        return (
            <Fragment>
                <NavBar/>
            </Fragment>
        )}
}

export default connect(null, null)(App)