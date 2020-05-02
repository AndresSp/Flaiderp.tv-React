'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import configFile from "../../assets/config/config.json"
import { fetchStreams, checkDiffStreams, FETCH_STREAMS_CLEARED } from "../../shared/actions/fetchStreams";
import { fetchStreamersBio } from "../../shared/actions/fetchStreamersBio";
import { addNotificationToQueue, showNotification, updateBadge } from '../../shared/actions/notifications';
import { onClickNotificationHandler } from '../../modules/apis/extension'

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

   const status = state.config.status
   const mainStreamer = state.config.streamers.main
   const enabledStreamers = state.config.streamers.enabled
   const disabledStreamers = state.config.streamers.disabled

     switch (name) {
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

