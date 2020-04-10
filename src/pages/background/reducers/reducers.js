import { combineReducers } from 'redux'
import { getStreamsReducer } from './getStreams'


export default combineReducers({
    getStreams: getStreamsReducer
})