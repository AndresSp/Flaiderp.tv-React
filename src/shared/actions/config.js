export const STATUS_ENABLED = 'STATUS_ENABLED'
export const STATUS_DISABLED = 'STATUS_DISABLED'

export const FETCH_INTERVAL_SETTED = 'FETCH_INTERVAL_SETTED'
export const NOTIFICATIONS_INTERVAL_SETTED = 'NOTIFICATIONS_INTERVAL_SETTED'

export const MAIN_STREAM_SETTED = 'MAIN_STREAM_SETTED'
export const MAIN_STREAM_CLEARED = 'MAIN_STREAM_CLEARED'

export const ENABLED_STREAMER_ADDED = 'ENABLED_STREAMER_ADDED'
export const ENABLED_STREAMER_REMOVED = 'ENABLED_STREAMER_REMOVED'

export const DISABLED_STREAMER_ADDED = 'DISABLED_STREAMER_ADDED'
export const DISABLED_STREAMER_REMOVED = 'DISABLED_STREAMER_REMOVED'


export const setStatusEnable = () => ({
    type: STATUS_ENABLED
})

export const setStatusDisable = () => ({
    type: STATUS_DISABLED
})

export const setfetchInterval = (interval) => ({
    type: FETCH_INTERVAL_SETTED,
    interval: interval
})

export const setNotificationInterval = (interval) => ({
    type: NOTIFICATIONS_INTERVAL_SETTED,
    interval: interval
})

export const setMainStreamer = (streamer) => ({
    type: MAIN_STREAM_SETTED,
    streamer: streamer
})

export const clearMainStreamer = () => ({
    type: MAIN_STREAM_CLEARED
})

export const addEnabledStreamer = (streamer) => ({
    type: ENABLED_STREAMER_ADDED,
    streamer: streamer
})

export const removeEnabledStreamer = (streamer) => ({
    type: ENABLED_STREAMER_REMOVED,
    streamer: streamer
})

export const addDisabledStreamer = (streamer) => ({
    type: DISABLED_STREAMER_ADDED,
    streamer: streamer
})

export const removeDisabledStreamer = (streamer) => ({
    type: DISABLED_STREAMER_REMOVED,
    streamer: streamer
})

