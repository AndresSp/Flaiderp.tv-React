import { applyMiddleware, createStore } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { createLogger } from 'redux-logger'
import reducer from './reducers/reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
import configFile from "../../assets/config/config.json";
import { createEpicMiddleware } from 'redux-observable'
import rootEpics from '../../modules/epics/epics'
  
  const initialState = {
    config: configFile,
    fetchStreams: {
      pending: false,
      data: [],
      error: null
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
  
  export default store
