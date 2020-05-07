import { combineReducers } from 'redux'
import undoable, { includeAction } from 'redux-undo'
import { configReducer } from './config'
import { fetchStreamsReducer } from './fetchStreams'
import { persistReducer } from 'redux-persist'
import { syncStorage, localStorage } from 'redux-persist-webextension-storage'
import { notificationsReducer } from './notifications'
import { fetchStreamersBiosReducer } from './fetchStreamersBio'
import { FETCH_STREAMS_SUCCESSFULLY } from '../../../shared/actions/fetchStreams'
import { authReducer } from './auth'
import { getBrowser } from '../../../modules/apis/extension'

const syncStorageConfigToConfigReducer = {
  key: 'config',
  storage: /*getBrowser() == 'FIREFOX'? localStorage :*/ syncStorage
}

const syncStorageConfigToAuthReducer = {
  key: 'auth',
  storage: /*getBrowser() == 'FIREFOX'? localStorage :*/ syncStorage,
  whitelist: ['accessToken']
}

const undoableConfig = {
  limit: 10,
  filter: includeAction(FETCH_STREAMS_SUCCESSFULLY)
}


export default combineReducers({
    config: persistReducer(syncStorageConfigToConfigReducer, configReducer),
    auth: persistReducer(syncStorageConfigToAuthReducer, authReducer),
    fetchBios: fetchStreamersBiosReducer,
    fetchStreams: undoable(fetchStreamsReducer, undoableConfig),
    notifications: notificationsReducer
})