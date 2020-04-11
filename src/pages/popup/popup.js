'use strict';

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import App from './components/App';

const store = new Store({
  portName: 'FLAIDERPTV'
})

const rootDiv = document.createElement('div')
rootDiv.id = 'root'
document.body.insertBefore(rootDiv, document.body.childNodes[0])

store.ready().then(async () => {
  //const response = await getStreams(store.dispatch, enabledStreamers)
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
  , document.querySelector("#root"))
})