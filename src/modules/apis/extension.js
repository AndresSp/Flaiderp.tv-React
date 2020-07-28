import * as browser from 'webextension-polyfill'
import * as Bowser from "bowser-mini";
import { CLIENT_ID_CHROME, CLIENT_ID_FIREFOX, CLIENT_ID_EDGE } from "../../env.json";

export const authExtension = async (showPrompt) => {
    const client_id = getClientByBrowser(getBrowser());
    const redirectUri = browser.identity.getRedirectURL(); 
    const auth_url = "https://id.twitch.tv/oauth2/authorize?client_id=" + client_id + "&redirect_uri=" + redirectUri + "&response_type=token";

    const redirectUrl = await browser.identity.launchWebAuthFlow({'url': auth_url, 'interactive': showPrompt});

    const redirectRe = new RegExp(redirectUri + '[#\?](.*)');
    const matches = redirectUrl.match(redirectRe);
    if (matches && matches.length > 1){
        const values = parseRedirectFragment(matches[1])
        if (values.hasOwnProperty('access_token')){
            return values.access_token
        }
    }

    return null
}

function parseRedirectFragment(fragment) {
    var pairs = fragment.split(/&/);
    var values = {};

    pairs.forEach(function(pair) {
      var nameval = pair.split(/=/);
      values[nameval[0]] = nameval[1];
    });

    return values;
  }

export const createNotification = async (stream, profileImg, present = true) => {
    const userName = stream.user_name
    const streamTitle = stream.title
    const icon = profileImg? await imgUrlToBlob(profileImg) : './../../assets/icon/128.png'
    const started_at = stream.started_at

    try{
        await browser.notifications.clear(userName)

        await browser.notifications.create(
        userName,
        {
            type:     'basic',
            iconUrl:  icon,
            title:    `${userName}`,
            message:  `${streamTitle}`,
            contextMessage: `${present? 'Está' : 'Estuvo'} en directo - ${getStreamingTime(started_at)}`,
            priority: 0
        })
    } catch(e){
        console.log(e)
    }
}

const getStreamingTime = (started_at) => {
    const startedAt = new Date(started_at).getTime()
    const current = new Date().getTime()
    const diff = current - startedAt

    let msec = diff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    return `${hh > 0 ? `${hh} h` : ''} ${mm > 0 ? `${mm} m` : ''} ${ss > 0 ? `${ss} s` : ''}`
}

async function thumbnailToBlob(thumbnail_url, width, height) {
    try {
        const tUrl = new URL(getThumbnailURL(thumbnail_url, width, height));
        const response = await fetch(tUrl)
        const blob = await response.blob()
        const blobURL = URL.createObjectURL(blob);
        return blobURL
    } catch (error) {
        console.log(error)
    }
}

async function imgUrlToBlob(imgUrl) {
    try {
        const tUrl = new URL(imgUrl);
        const response = await fetch(tUrl.toString())
        const blob = await response.blob()
        const blobURL = URL.createObjectURL(blob);
        return blobURL
    } catch (error) {
        console.log(error)
    }
}

export const onClickNotificationHandler = (userName) => {
    const userNameUrl = userName.toLowerCase()
    
    getBrowser() == 'FIREFOX' ? 
    browser.windows.create({url: `https://www.twitch.tv/${userNameUrl}`}) : 
    window.open(`https://www.twitch.tv/${userNameUrl}`, '_blank')

    browser.notifications.clear(userName);
}

export const setBadge = async (amount, main = false) => {

    const badgeText = await browser.browserAction.getBadgeText({})
    //await browser.browserAction.setBadgeBackgroundColor({color: [66,133,244,255]});
    let newBadgeText = ''

    if(main){
        newBadgeText = `${'ON'}`
    }
    else if(amount > 0) {
        newBadgeText = `${amount}`
    } else {
        newBadgeText = ''
    }

    if(badgeText !== newBadgeText){
        await browser.browserAction.setBadgeText({
            text: `${newBadgeText}`
        })
    }
}

export const uninstall = async () => {
    return await browser.management.uninstallSelf({ showConfirmDialog: true })
}

export const getBrowser = () => {
    const browser = Bowser.parse(window.navigator.userAgent)[0]
    switch (browser) {
        case 'C': return CHROME
        case 'F': return FIREFOX
        case 'x': return EDGE
        case 'O': return CHROME
        default: return CHROME
    }
}

export const getClientByBrowser = (browser) => {

    switch (browser) {
        case CHROME: return CLIENT_ID_CHROME
        case FIREFOX: return CLIENT_ID_FIREFOX
        case EDGE: return CLIENT_ID_EDGE
        default: return null
    }
}

export const CHROME = 'CHROME'
export const FIREFOX = 'FIREFOX'
export const EDGE = 'EDGE'