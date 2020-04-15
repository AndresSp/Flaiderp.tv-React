import { combineReducers } from 'redux'
import { configReducer } from './config'
import { fetchStreamsReducer } from './fetchStreams'
import { persistReducer } from 'redux-persist'
import { syncStorage } from 'redux-persist-webextension-storage'

const syncStorageConfig = {
    key: 'config',
    storage: syncStorage
  }


export default combineReducers({
    config: persistReducer(syncStorageConfig, configReducer),
    fetchStreams: fetchStreamsReducer
})