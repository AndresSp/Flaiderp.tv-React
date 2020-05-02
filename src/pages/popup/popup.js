'use strict';

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import App from "./containers/App";
import 'semantic-ui-css/semantic.min.css';
import './css/popup.css'

const store = new Store({
  portName: 'FLAIDERPTV'
})

const rootDiv = document.createElement('div')
rootDiv.id = 'root'
//rootDiv.style.height = '100%'
// rootDiv.style.minHeight = '300px'
document.body.insertBefore(rootDiv, document.body.childNodes[0])

store.ready().then(async () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
  , document.querySelector("#root"))
})