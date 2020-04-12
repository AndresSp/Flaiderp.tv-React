import { combineReducers } from 'redux'
import { configReducer } from './config'
import { fetchStreamsReducer } from './fetchStreams'


export default combineReducers({
    config: configReducer,
    fetchStreams: fetchStreamsReducer
})