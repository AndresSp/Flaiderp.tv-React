import { combineReducers } from 'redux'
import { configReducer } from './config'
import { fetchStreamsReducer } from './fetchStreams'
import { persistReducer } from 'redux-persist'
import { syncStorage } from 'redux-persist-webextension-storage'
import { notificationsReducer } from './notifications'

const syncStorageConfig = {
    key: 'config',
    storage: syncStorage
  }


export default combineReducers({
    config: persistReducer(syncStorageConfig, configReducer),
    fetchStreams: fetchStreamsReducer,
    notifications: notificationsReducer
})