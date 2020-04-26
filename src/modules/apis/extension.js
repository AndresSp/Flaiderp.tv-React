import * as browser from 'webextension-polyfill'

export const createNotification = async (stream, profileImg, present = true) => {
    const userName = stream.user_name
    const streamTitle = stream.title
    const icon = profileImg? await imgUrlToBlob(profileImg) : './../../assets/icon/128.png'
    const started_at = stream.started_at

    
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

const getThumbnailURL = (thumbnail_url, width, height) => {
    return thumbnail_url
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
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
        const response = await fetch(tUrl)
        const blob = await response.blob()
        const blobURL = URL.createObjectURL(blob);
        return blobURL
    } catch (error) {
        console.log(error)
    }
}

export const onClickNotificationHandler = (userName) => {
    const userNameUrl = userName.toLowerCase()
    window.open(`https://www.twitch.tv/${userNameUrl}`, '_blank');
    browser.notifications.clear(userName);
    //browser.notifications.onClicked.removeListener(onClickNotificationHandler);
}