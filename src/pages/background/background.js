'use strict';

import "babel-polyfill";
import * as browser from 'webextension-polyfill'
import store from './store'
import configFile from "../../assets/config/config.json"
import { fetchStreams } from "../../modules/webAPIs";
import { changeStatus } from "../../modules/extUtils";
//import * as listActions from '../../shared/actions/listActions'

const fakeRequest = {"data":[{"id":"37168856816","user_id":"94415649","user_name":"Brenditz","game_id":"509658","type":"live","title":"Dia de chisme! chi cheñol! -  Nuevas Alertas 100, 300 y 500 Bits! - Brenditz","viewer_count":59,"started_at":"2020-03-17T01:04:04Z","language":"es","thumbnail_url":"https://static-cdn.jtvnw.net/previews-ttv/live_user_brenditz-{width}x{height}.jpg","tag_ids":["d4bb9c58-2141-4881-bcdc-3fe0505457d1"]}],"pagination":{"cursor":"IA"}}
//console.log(fakeRequest)



browser.runtime.onInstalled.addListener(async (details) => {
    await browser.storage.sync.set(configFile)
    browser.alarms.create('fetchStreams', { when: 0, periodInMinutes: 1 })
 })

 browser.storage.onChanged.addListener(async (changes) => {
    const config = await browser.storage.sync.get()

 })

 browser.alarms.onAlarm.addListener(async ({ name }) => {
    const config = await browser.storage.sync.get()
    const status = config.status
    const enabledStreamers = config.streamers.enabled
     switch (name) {
         case 'fetchStreams':
            await onFetchStreams(enabledStreamers)
            //await changeStatus(!status)
             break;
     
         default:
             break;
     }
 })

 const onFetchStreams = async (enabledStreamers) => {
    await store.dispatch(fetchStreams(enabledStreamers))
 }

