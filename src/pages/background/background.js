'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import configFile from "../../assets/config/config.json"
import { fetchStreams } from "../../shared/actions/fetchStreams";
import { fetchStreamersBio } from "../../shared/actions/fetchStreamersBio";

const fakeRequest = {"data":[{"id":"37168856816","user_id":"94415649","user_name":"Brenditz","game_id":"509658","type":"live","title":"Dia de chisme! chi cheñol! -  Nuevas Alertas 100, 300 y 500 Bits! - Brenditz","viewer_count":59,"started_at":"2020-03-17T01:04:04Z","language":"es","thumbnail_url":"https://static-cdn.jtvnw.net/previews-ttv/live_user_brenditz-{width}x{height}.jpg","tag_ids":["d4bb9c58-2141-4881-bcdc-3fe0505457d1"]}],"pagination":{"cursor":"IA"}}
//console.log(fakeRequest)



browser.runtime.onInstalled.addListener(async (details) => {
   const currentVersion = await chrome.runtime.getManifest().version
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
   console.log(currentVersion)

    await browser.alarms.create('fetchStreams', { when: 0, periodInMinutes: 1 })
 })

 browser.storage.onChanged.addListener(async (changes) => {
    console.log(changes)
 })

 browser.alarms.onAlarm.addListener(async ({ name }) => {
   const currentState = store.getState()
   const status = currentState.config.status
   const mainStreamer = currentState.config.streamers.main
   const enabledStreamers = currentState.config.streamers.enabled
   const disabledStreamers = currentState.config.streamers.disabled
     switch (name) {
         case 'fetchStreamersBio':
            await onFetchStreamersBio([mainStreamer, ...enabledStreamers, ...disabledStreamers])
            break;

         case 'fetchStreams':
            await onFetchStreams([mainStreamer, ...enabledStreamers])
            //await changeStatus(!status)
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

