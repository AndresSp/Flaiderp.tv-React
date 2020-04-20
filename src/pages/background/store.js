import { applyMiddleware, createStore } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { createLogger } from 'redux-logger'
import reducer from './reducers/reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
import configFile from "../../assets/config/config.json";
import configTestFile from "../../assets/config/configTest.json";
import { createEpicMiddleware } from 'redux-observable'
import rootEpics from '../../modules/epics/epics'
import { persistStore } from 'redux-persist'
  
  const initialState = {
    config: configFile,
    //config: configTestFile,
    fetchStreams: {
      pending: false,
      data: [],
      error: null
    },
    notifications: {
      queue: [],
      pending: undefined
    }
  }

  const logger = createLogger({
    collapsed: true,
  })
  
  const epicMiddleware = createEpicMiddleware();

  const composeEnhancers = composeWithDevTools({
    hostname: 'localhost',
    port: 9000
  });

  let middlewares = [epicMiddleware];


  if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
  }

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
    applyMiddleware(...middlewares)
    )
  )

  epicMiddleware.run(rootEpics);

  wrapStore(store, {
    portName: 'FLAIDERPTV',
  })

  const persistor = persistStore(store)
  
  export default store
