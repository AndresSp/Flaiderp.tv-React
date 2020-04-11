import { combineReducers } from 'redux'
import { getStreamsReducer } from './fetchStreams'


export default combineReducers({
    getStreams: getStreamsReducer
})