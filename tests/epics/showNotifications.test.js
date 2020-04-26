import { enableFetchMocks } from 'jest-fetch-mock'
import { SHOW_NOTIFICATION } from "../../src/shared/actions/notifications";
import { StateObservable, ActionsObservable } from "redux-observable";
import { Subject } from "rxjs";
import { showPendingAndAvailableInPresent, showPendingAndAvailableInPast } from "../fixtures/showNotifications";
import { showNotificationsEpic } from "../../src/modules/epics/epics";
import { toArray } from "rxjs/operators";

describe('showNotificationsEpic', () => {

    beforeAll(async () => {
        enableFetchMocks()
        URL.createObjectURL = jest.fn()
    });

    it('should show pending notification, , find info in the present and clear when it was dispatched', async () => {

        const action$ = ActionsObservable.of({
            type: SHOW_NOTIFICATION
        });
        
        const state$ = new StateObservable(new Subject(), showPendingAndAvailableInPresent)

        const epic$ = showNotificationsEpic(action$, state$);

        const result = await epic$.pipe(toArray()).toPromise();

        expect(result).toEqual([ { "type": 'CLEAR_PENDING_NOTIFICATION' } ])
    })

    it('should show pending notification, find info in the past and clear when it was dispatched', async () => {
        const action$ = ActionsObservable.of({
            type: SHOW_NOTIFICATION
        });
        
        const state$ = new StateObservable(new Subject(), showPendingAndAvailableInPast)

        const epic$ = showNotificationsEpic(action$, state$);

        const result = await epic$.pipe(toArray()).toPromise();

        expect(result).toEqual([ { "type": 'CLEAR_PENDING_NOTIFICATION' } ])
    })
})