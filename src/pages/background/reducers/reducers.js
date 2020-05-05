import { combineReducers } from 'redux'
import undoable, { includeAction } from 'redux-undo'
import { configReducer } from './config'
import { fetchStreamsReducer } from './fetchStreams'
import { persistReducer } from 'redux-persist'
import { syncStorage } from 'redux-persist-webextension-storage'
import { notificationsReducer } from './notifications'
import { fetchStreamersBiosReducer } from './fetchStreamersBio'
import { FETCH_STREAMS_SUCCESSFULLY } from '../../../shared/actions/fetchStreams'
import { authReducer } from './auth'

const syncStorageConfig = {
    key: 'config',
    storage: syncStorage
  }

const undoableConfig = {
  limit: 10,
  filter: includeAction(FETCH_STREAMS_SUCCESSFULLY)
}


export default combineReducers({
    config: persistReducer(syncStorageConfig, configReducer),
    auth: authReducer,
    fetchBios: fetchStreamersBiosReducer,
    fetchStreams: undoable(fetchStreamsReducer, undoableConfig),
    notifications: notificationsReducer
})