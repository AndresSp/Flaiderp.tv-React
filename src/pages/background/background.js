'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import configFile from "../../assets/config/config.json"
import { fetchStreams, checkDiffStreams } from "../../shared/actions/fetchStreams";
import { fetchStreamersBio } from "../../shared/actions/fetchStreamersBio";
import { addNotificationToQueue, showNotification } from '../../shared/actions/notifications';

const fakeRequest = {"data":[{"id":"37168856816","user_id":"94415649","user_name":"Brenditz","game_id":"509658","type":"live","title":"Dia de chisme! chi cheñol! -  Nuevas Alertas 100, 300 y 500 Bits! - Brenditz","viewer_count":59,"started_at":"2020-03-17T01:04:04Z","language":"es","thumbnail_url":"https://static-cdn.jtvnw.net/previews-ttv/live_user_brenditz-{width}x{height}.jpg","tag_ids":["d4bb9c58-2141-4881-bcdc-3fe0505457d1"]}],"pagination":{"cursor":"IA"}}
//console.log(fakeRequest)

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
         if(currentVersion === '2.0.0'){
            await browser.storage.sync.clear()
         }
         break;
      case 'chrome_update':
      case 'shared_module_update':
      default:
         console.log('Other install events within the browser')
         break;
   }
   
   await browser.alarms.create('fetchStreamersBio', { when: 0, periodInMinutes: 1 })
   await browser.alarms.create('fetchStreams', { when: 0, periodInMinutes: 1 })
   await browser.alarms.create('showNotifications', { when: 0, periodInMinutes: 1 })
 })

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

