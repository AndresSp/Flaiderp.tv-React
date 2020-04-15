import { fetchStreamsPending, fetchStreamsError, fetchStreamsSuccessfully, FETCH_STREAMS } from "../../shared/actions/fetchStreams";
import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
//import { switchMap } from 'rxjs/operator/switchMap';
import { map, catchError, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { fetchStreamsByUserId } from "../apis/twitch";
import { changeStatus } from "../apis/extension";
import { saveConfig, TOGGLE_STATUS } from "../../shared/actions/config";


export const fetchStreamsEpic = (action$, state$) => action$.pipe(
    ofType(FETCH_STREAMS),
    switchMap(action => from(fetchStreamsByUserId(action.streamers)).pipe(
        map(response => fetchStreamsSuccessfully(response)),
        takeUntil(action$.pipe(
            ofType(FETCH_STREAMS)
            )),
        catchError(error => of(fetchStreamsError(error)))
        )
    )
)

// export const enableStreamsEpic = (action$, state$) => action$.pipe(
//     ofType(TOGGLE_STATUS),
//     switchMap(action => {
//         const status = state$.value.config.status
//         return from(changeStatus(status)).pipe(
//             map(response => saveConfig())
//         )
//     })
// )

export default combineEpics(
    fetchStreamsEpic,
    //enableStreamsEpic
);