'use strict';

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import TestContainer from './containers/TestContainer';
import 'semantic-ui-css/semantic.min.css'

const store = new Store({
  portName: 'FLAIDERPTV'
})

const rootDiv = document.createElement('div')
rootDiv.id = 'root'
document.body.insertBefore(rootDiv, document.body.childNodes[0])

store.ready().then(async () => {
  ReactDOM.render(
    <Provider store={store}>
      <TestContainer/>
    </Provider>
  , document.querySelector("#root"))
})