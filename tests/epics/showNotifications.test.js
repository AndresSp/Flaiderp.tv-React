
import { checkFetchStreamsDiffEpic } from '../../src/modules/epics/epics';
import { CHECK_DIFF_STREAMS } from '../../src/shared/actions/fetchStreams';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { toArray } from 'rxjs/operators';
import { checkDiffStreamsState } from '../fixtures/store';
import { Subject } from 'rxjs';
// const puppeteer = require('puppeteer');
// const path = require('path');


// Path to the actual extension we want to be testing
//const pathToExtension = require('path').resolve('./dist');

// Tell puppeteer we want to load the web extension
// const puppeteerArgs = [
//   `--disable-extensions-except=${pathToExtension}`,
//   `--load-extension=${pathToExtension}`,
//   '--show-component-extension-options',
// ];

describe('checkFetchStreamsDiffEpic', () => {
    //let page, browser;

  beforeAll(async () => {
    // jest.setTimeout(30000);
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250,
    //   devtools: true,
    //   args: puppeteerArgs
    // });

    // // Creates a new tab
    // page = await browser.newPage();

    // // navigates to some specific page
    // await page.goto('https://google.com');
  });

  afterAll(async () => {
    // Tear down the browser
    //await browser.close();
  })

    it('should dispatch SHOW_NOTIFICATION when CHECK_DIFF_STREAMS was dispatched and has difference', async () => {
        // Create an Observable stream of the dispatching action.
        const action$ = ActionsObservable.of({
            type: CHECK_DIFF_STREAMS
        });
        
        const state$ = new StateObservable(new Subject(), checkDiffStreamsState)

        // Pass the Observable action to our action and inject the
        // mocked client instance.
        const epic$ = checkFetchStreamsDiffEpic(action$, state$);

        // Get the resulting actions by using async/await.
        const result = await epic$.pipe(toArray()).toPromise();

        // Test if we've received the expected action as result.
        expect(result).toEqual([ 
          { type: 'ADDED_NOTIFICATION_TO_QUEUE', streamerId: '103588982' },
          { type: 'ADDED_NOTIFICATION_TO_QUEUE', streamerId: '105458682' },
          { type: 'SHOW_NOTIFICATION' } ])

        expect(result)
    })
  });