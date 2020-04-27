import { fetchStreamsPending, fetchStreamsError, fetchStreamsSuccessfully, FETCH_STREAMS, fetchStreams, fetchStreamsCleared, CHECK_DIFF_STREAMS } from "../../shared/actions/fetchStreams";
import { combineEpics, ofType } from "redux-observable";
import { from, of, forkJoin } from "rxjs";
//import { switchMap } from 'rxjs/operator/switchMap';
import { map, catchError, switchMap, takeUntil, filter, mapTo, concatMap, retry } from 'rxjs/operators';
import { fetchStreamsByUserId, fetchStreamersInfo } from "../apis/twitch";
import { createNotification, setBadge } from "../apis/extension";
import { TOGGLE_STATUS } from "../../shared/actions/config";
import { SHOW_NOTIFICATION, clearPendingNotification, showNotification, addNotificationToQueue, UPDATE_BADGE, badgeUpdated, updateBadge } from "../../shared/actions/notifications";
import { FETCH_STREAMERS_BIO, fetchStreamersBioSuccessfully, fetchStreamersBioError } from "../../shared/actions/fetchStreamersBio";


export const fetchBiosEpic = (action$, state$) => action$.pipe(
    ofType(FETCH_STREAMERS_BIO),
    switchMap(action => from(fetchStreamersInfo(action.streamers)).pipe(
        map(response => fetchStreamersBioSuccessfully(response)),
        takeUntil(action$.pipe(
            ofType(FETCH_STREAMERS_BIO)
            )),
        retry(2),
        catchError(error => of(fetchStreamersBioError(error)))
        )
    )
)

export const fetchStreamsEpic = (action$, state$) => action$.pipe(
    ofType(FETCH_STREAMS),
    filter(() => state$.value.config.status),
    switchMap(action => from(fetchStreamsByUserId(action.streamers)).pipe(
        concatMap(response => [fetchStreamsSuccessfully(response), updateBadge()]),
        takeUntil(action$.pipe(
            ofType(FETCH_STREAMS)
            )),
        retry(2),
        catchError(error => of(fetchStreamsError(error)))
        )
    )
)

export const resetWhenEnabledEpic = (action$, state$) => action$.pipe(
    ofType(TOGGLE_STATUS),
    filter(() => state$.value.config.status),
    mapTo(fetchStreams([
        ...state$.value.config.streamers.main, 
        ...state$.value.config.streamers.enabled
    ]))
)

export const checkFetchStreamsDiffEpic = (action$, state$) => action$.pipe(
    ofType(CHECK_DIFF_STREAMS),
    concatMap(() => {
        const mainStreamer = state$.value.config.streamers.main.length ? state$.value.config.streamers.main[0] : undefined
        const prevStreams = state$.value.fetchStreams.past.length ? Array.from(state$.value.fetchStreams.past)[state$.value.fetchStreams.past.length - 1].data : []
        const streams = state$.value.fetchStreams.present.data
        const notifQueue = state$.value.notifications.queue

        const prevStreamers = prevStreams.map((stream) => stream.user_id).sort()
        const streamers = streams.map((stream) => stream.user_id).sort()

        const equal = prevStreamers.toString() === streamers.toString()
        let actions = []
        if(!equal){
            const diffTurnedOn = streamers.filter((streamer) => !prevStreamers.includes(streamer))
            const diffTurnedOff = prevStreamers.filter((streamer) => !streamers.includes(streamer))

            const streamersToAdd = diffTurnedOn.filter((streamer) => !notifQueue.includes(streamer))

            Array.from(streamersToAdd).map((streamer) => {
                if(mainStreamer && streamer == mainStreamer){
                    actions.unshift(addNotificationToQueue(streamer))
                } else {
                    actions.push(addNotificationToQueue(streamer))
                }
            })
        }

        actions.push(showNotification())
        return actions
    })
    
)


export const showNotificationsEpic = (action$, state$) => action$.pipe(
    ofType(SHOW_NOTIFICATION),
    filter(() => state$.value.notifications.pending),
    switchMap(action => {
        const state = state$.value
        const pendingUserId = state.notifications.pending
        const stream = Array.from(state.fetchStreams.present.data).find((stream) => stream.user_id == pendingUserId)
        let bioImg = Array.from(state.fetchBios.data).find((bio) => bio.id == pendingUserId)?.profile_image_url

        if(stream){
            return from(createNotification(stream, bioImg))
        } else {
            const pastStreams = Array.from(state.fetchStreams.past).reverse()
            const pastStreamSelected = pastStreams.find((past) => Array.from(past.data).find((stream) => stream.user_id == pendingUserId))
            const pastStream = pastStreamSelected.data.length ? pastStreamSelected.data[0] : undefined 

            if(pastStreamSelected){
                return from(createNotification(pastStream, bioImg, false))
            } else {
                return of(undefined)
            }
        }
    }),
    mapTo(clearPendingNotification())
    
)

export const updateBadgeEpic = (action$, state$) => action$.pipe(
    ofType(UPDATE_BADGE),
    switchMap(async action$ => {
        const state = state$.value
        const mainStreamer = state.config.streamers.main.length ? state$.value.config.streamers.main[0] : undefined
        const streams = Array.from(state.fetchStreams.present.data)
        const mainStream = streams.find(stream => stream.user_id == mainStreamer)

        await setBadge(streams.length, mainStream)
        return badgeUpdated()
    }),
)

export default combineEpics(
    fetchBiosEpic,
    fetchStreamsEpic,
    checkFetchStreamsDiffEpic,
    showNotificationsEpic,
    resetWhenEnabledEpic,
    updateBadgeEpic
    //clearWhenDisabledEpic
);