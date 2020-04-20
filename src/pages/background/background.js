'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import configFile from "../../assets/config/config.json"
import { fetchStreams } from "../../shared/actions/fetchStreams";
import { fetchStreamersBio } from "../../shared/actions/fetchStreamersBio";
import { addNotificationToQueue, showNotification } from '../../shared/actions/notifications';

const fakeRequest = {"data":[{"id":"37168856816","user_id":"94415649","user_name":"Brenditz","game_id":"509658","type":"live","title":"Dia de chisme! chi cheñol! -  Nuevas Alertas 100, 300 y 500 Bits! - Brenditz","viewer_count":59,"started_at":"2020-03-17T01:04:04Z","language":"es","thumbnail_url":"https://static-cdn.jtvnw.net/previews-ttv/live_user_brenditz-{width}x{height}.jpg","tag_ids":["d4bb9c58-2141-4881-bcdc-3fe0505457d1"]}],"pagination":{"cursor":"IA"}}
//console.log(fakeRequest)

let previousState;

browser.runtime.onUpdateAvailable.addListener(async (details) => {
   //TODO: create notification "Available Update"
})


browser.runtime.onInstalled.addListener(async (details) => {
   const currentVersion = chrome.runtime.getManifest().version
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

    await browser.alarms.create('fetchStreams', { when: 0, periodInMinutes: 1 })
    await browser.alarms.create('showNotifications', { when: 1, periodInMinutes: 1 })
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

   const previousStreams = previousState?.fetchStreams?.data ? previousState.fetchStreams.data : []
   const currentStreams = currentState.fetchStreams.data
   const currentNotificationQ = currentState.notifications.queue

     switch (name) {
         case 'fetchStreamersBio':
            await onFetchStreamersBio([...mainStreamer, ...enabledStreamers, ...disabledStreamers])
            break;

         case 'fetchStreams':
            await onFetchStreams([...mainStreamer, ...enabledStreamers])
            await onCheckStreams(previousStreams, currentStreams, currentNotificationQ)
            previousState = { ...currentState }
             break;
         
         case 'showNotifications':
            await onShowNotifications() 
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

 const onCheckStreams = async (previousStreams, currentStreams, currentNotificationQ) => {
    const previous = Array.from(previousStreams).map((stream) => stream.user_id)
    const current = Array.from(currentStreams).map((stream) => stream.user_id)
    const currentNQ = Array.from(currentNotificationQ)

    const equal = previous.toString() === current.toString()

    console.log(equal, previous, current)
    if(!equal){
       const diffStreamsTurnedOn = current.filter((stream) => !previous.includes(stream))
       const diffStreamsTurnedOff = previous.filter((stream) => !current.includes(stream))

       console.log('diffStreamsTurnedOn',diffStreamsTurnedOn)
       console.log('diffStreamsTurnedOff', diffStreamsTurnedOff)

       diffStreamsTurnedOn
       .filter((streamerId) => !currentNQ.includes(streamerId))
       .map((streamerId) => store.dispatch(addNotificationToQueue(streamerId)))
    }
  // await 
 }

 const onShowNotifications = async () => {
   await store.dispatch(showNotification())
 }

