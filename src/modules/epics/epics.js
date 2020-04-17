import { fetchStreamsPending, fetchStreamsError, fetchStreamsSuccessfully, FETCH_STREAMS, fetchStreams, fetchStreamsCleared } from "../../shared/actions/fetchStreams";
import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
//import { switchMap } from 'rxjs/operator/switchMap';
import { map, catchError, mergeMap, switchMap, takeUntil, filter, mapTo } from 'rxjs/operators';
import { fetchStreamsByUserId } from "../apis/twitch";
import { changeStatus } from "../apis/extension";
import { saveConfig, TOGGLE_STATUS } from "../../shared/actions/config";


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

export default combineEpics(
    fetchStreamsEpic,
    resetWhenEnabledEpic,
    clearWhenDisabledEpic
);