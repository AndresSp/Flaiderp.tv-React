
import { checkFetchStreamsDiffEpic } from '../../src/modules/epics/epics';
import { CHECK_DIFF_STREAMS } from '../../src/shared/actions/fetchStreams';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { toArray } from 'rxjs/operators';
import { checkDiffStreamsState } from '../fixtures/store';
import { Subject } from 'rxjs';

describe('checkFetchStreamsDiffEpic', () => {

  beforeAll(async () => {
  });


    it('should add to streams to queue and show first one when streams status was checked and it has difference', async () => {
      
        const action$ = ActionsObservable.of({
            type: CHECK_DIFF_STREAMS
        });
        
        const state$ = new StateObservable(new Subject(), checkDiffStreamsState)

        const epic$ = checkFetchStreamsDiffEpic(action$, state$);

        const result = await epic$.pipe(toArray()).toPromise();

        expect(result).toEqual([ 
          { type: 'ADDED_NOTIFICATION_TO_QUEUE', streamerId: '103588982' },
          { type: 'ADDED_NOTIFICATION_TO_QUEUE', streamerId: '105458682' },
          { type: 'SHOW_NOTIFICATION' } ])

        expect(result)
    })

    afterAll(async () => {
    })
  });