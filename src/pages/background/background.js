'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import { fetchStreams, checkDiffStreams, FETCH_STREAMS_CLEARED } from "../../shared/actions/fetchStreams";
import { fetchStreamersBio } from "../../shared/actions/fetchStreamersBio";
import { addNotificationToQueue, showNotification, updateBadge } from '../../shared/actions/notifications';
import { onClickNotificationHandler } from '../../modules/apis/extension'
import { CLIENT_ID } from './../../env.json';
import { auth, validateToken } from "../../shared/actions/auth";

browser.runtime.onUpdateAvailable.addListener(async (details) => {
   //TODO: create notification "Available Update"
})


browser.runtime.onInstalled.addListener(async (details) => {
   const version = chrome.runtime.getManifest().version
   const reason = details.reason

   switch (reason) {
      case 'install':
         await browser.storage.sync.clear()
         break;
      case 'update':
         if(version === '2.0.0'){
            await browser.storage.sync.clear()
         }
         break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
         console.log('Other install events within the browser')
         break;
   }
   await browser.alarms.create('authAgain', { delayInMinutes: 1440, periodInMinutes: 1440 }) //each day
   await browser.alarms.create('validateToken', { when: 0, periodInMinutes: 30 })
   await browser.alarms.create('fetchStreamersBio', { when: 0, periodInMinutes: 60 })
   await browser.alarms.create('fetchStreams', { when: 0, periodInMinutes: 1 })
 })

 browser.notifications.onClicked.addListener((userName) => 
 onClickNotificationHandler(userName));

 browser.storage.onChanged.addListener(async (changes) => {
    console.log(changes)
 })

 browser.alarms.onAlarm.addListener(async ({ name }) => {
   const state = store.getState()

   const accessToken = state.auth.accessToken
   const status = state.config.status
   const mainStreamer = state.config.streamers.main
   const enabledStreamers = state.config.streamers.enabled
   const disabledStreamers = state.config.streamers.disabled

     switch (name) {
        case 'authAgain':
           await onAuthAgain(accessToken)
           break;

         case 'validateToken':
            await onValidateTokens()
            break;

         case 'fetchStreamersBio':
            await onFetchStreamersBio([...mainStreamer, ...enabledStreamers, ...disabledStreamers])
            break;

         case 'fetchStreams':
            await onFetchStreams([...mainStreamer, ...enabledStreamers])
            //await onUpdateBadge() //update badge
            await onCheckStreams() //check, add to queue and show notifications
             break;

         default:
             break;
     }
 })

 const onAuthAgain = async (accessToken) => {
    if(accessToken){
      await store.dispatch(auth())
    }
 }

 const onValidateTokens = async () => {
    await store.dispatch(validateToken())
 }

 const onFetchStreamersBio = async (streamers) => {
   await store.dispatch(fetchStreamersBio(streamers))
}

 const onFetchStreams = async (streamers) => {
    await store.dispatch(fetchStreams(streamers))
 }

 const onCheckStreams = async () => {
   await store.dispatch(checkDiffStreams())
 }

 const onShowNotifications = async () => {
   await store.dispatch(showNotification())
 }

