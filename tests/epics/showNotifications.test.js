import { enableFetchMocks } from 'jest-fetch-mock'
import { SHOW_NOTIFICATION } from "../../src/shared/actions/notifications";
import { StateObservable, ActionsObservable } from "redux-observable";
import { Subject } from "rxjs";
import { showPendingAndAvailableInPresent } from "../fixtures/showNotifications";
import { showNotificationsEpic } from "../../src/modules/epics/epics";
import { toArray } from "rxjs/operators";

describe('showNotificationsEpic', () => {
    it('should show pending notification and clear when was dispatched', async () => {

        const action$ = ActionsObservable.of({
            type: SHOW_NOTIFICATION
        });

        enableFetchMocks()
        URL.createObjectURL = jest.fn()
        
        const state$ = new StateObservable(new Subject(), showPendingAndAvailableInPresent)

        const epic$ = showNotificationsEpic(action$, state$);

        const result = await epic$.pipe(toArray()).toPromise();

        expect(result).toEqual([ { "type": 'CLEAR_PENDING_NOTIFICATION' } ])
    })
})