import { applyMiddleware, createStore } from 'redux'
import { wrapStore, alias } from 'webext-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/reducers'
import { composeWithDevTools } from 'remote-redux-devtools'
  
  const initialState = {
    getStreams: {
      pending: false,
      streams: [],
      error: null
    }
  }

  const logger = createLogger({
    collapsed: true,
  })

  const composeEnhancers = composeWithDevTools({
    hostname: 'localhost',
    port: 9000
  });

  let middlewares = [thunk];


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

  //store.subscribe((s) => console.log(store.getState()))

  wrapStore(store, {
    portName: 'FLAIDERPTV',
  })
  
  export default store
