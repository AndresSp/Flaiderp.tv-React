export const TOGGLE_STATUS = 'TOGGLE_STATUS'

export const FETCH_INTERVAL_SETTED = 'FETCH_INTERVAL_SETTED'
export const NOTIFICATIONS_INTERVAL_SETTED = 'NOTIFICATIONS_INTERVAL_SETTED'

export const MAIN_STREAM_SETTED = 'MAIN_STREAM_SETTED'
export const MAIN_STREAM_CLEARED = 'MAIN_STREAM_CLEARED'

export const STREAMER_ENABLED = 'STREAMER_ENABLED'
export const STREAMER_DISABLED = 'STREAMER_DISABLED'

export const REORDERED_STREAMERS = 'REORDERED_STREAMERS'

export const CONFIG_SAVED = 'CONFIG_SAVED'


export const toggleStatus = () => ({
    type: TOGGLE_STATUS
})

export const setfetchInterval = (interval) => ({
    type: FETCH_INTERVAL_SETTED,
    interval: interval
})

export const setNotificationInterval = (interval) => ({
    type: NOTIFICATIONS_INTERVAL_SETTED,
    interval: interval
})

export const setMainStreamer = (source, target, streamer) => ({
    type: MAIN_STREAM_SETTED,
    source: source,
    target: target,
    streamer: streamer
})

export const clearMainStreamer = () => ({
    type: MAIN_STREAM_CLEARED
})

export const enableStreamer = (source, target, streamer) => ({
    type: STREAMER_ENABLED,
    source: source,
    target: target,
    streamer: streamer
})

export const disableStreamer = (source, target, streamer) => ({
    type: STREAMER_DISABLED,
    source: source,
    target: target,
    streamer: streamer
})

export const reorderStreamers = (streamers) => ({
    type: REORDERED_STREAMERS,
    streamers: streamers
})

export const saveConfig = () => ({
    type: CONFIG_SAVED
})

