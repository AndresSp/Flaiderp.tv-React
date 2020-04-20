import { fetchStreamsPending, fetchStreamsError, fetchStreamsSuccessfully, FETCH_STREAMS, fetchStreams, fetchStreamsCleared } from "../../shared/actions/fetchStreams";
import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
//import { switchMap } from 'rxjs/operator/switchMap';
import { map, catchError, mergeMap, switchMap, takeUntil, filter, mapTo } from 'rxjs/operators';
import { fetchStreamsByUserId } from "../apis/twitch";
import { changeStatus, createNotification } from "../apis/extension";
import { saveConfig, TOGGLE_STATUS } from "../../shared/actions/config";
import { ADDED_NOTIFICATION_TO_QUEUE, SHOW_NOTIFICATION, clearPendingNotification } from "../../shared/actions/notifications";


export const fetchStreamsEpic = (action$, state$) => action$.pipe(
    ofType(FETCH_STREAMS),
    filter(() => state$.value.config.status),
    switchMap(action => from(fetchStreamsByUserId(action.streamers)).pipe(
        map(response => fetchStreamsSuccessfully(response)),
        takeUntil(action$.pipe(
            ofType(FETCH_STREAMS)
            )),
        catchError(error => of(fetchStreamsError(error)))
        )
    )
)

export const resetWhenEnabledEpic = (action$, state$) => action$.pipe(
    ofType(TOGGLE_STATUS),
    filter(() => state$.value.config.status),
    mapTo(fetchStreams([
        state$.value.config.streamers.main, 
        ...state$.value.config.streamers.enabled
    ]))
)

export const clearWhenDisabledEpic = (action$, state$) => action$.pipe(
    ofType(TOGGLE_STATUS),
    filter(() => !state$.value.config.status),
    mapTo(fetchStreamsCleared())
)

// export const addNotificationToQueueEpic = (action$, state$) => action$.pipe(
//     ofType(ADDED_NOTIFICATION_TO_QUEUE),
//     switchMap(action => )
//     filter(() => !state$.value.config.status),
//     mapTo(fetchStreamsCleared())
// )

export const showNotificationsEpic = (action$, state$) => action$.pipe(
    ofType(SHOW_NOTIFICATION),
    filter(() => {
        console.log('after Show Notif', state$.value.notifications)
        return state$.value.notifications.pending
    }),
    switchMap(action => {
        const currentState = state$.value
        const pendingNotification = currentState.notifications.pending
        const stream = Array.from(currentState.fetchStreams.data).find((stream) => stream.user_id == pendingNotification)
        return from(createNotification(stream))
    }),
    mapTo(clearPendingNotification())
    
)

export default combineEpics(
    fetchStreamsEpic,
    showNotificationsEpic,
    resetWhenEnabledEpic,
    clearWhenDisabledEpic
);