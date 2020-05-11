export const ADDED_NOTIFICATION_TO_QUEUE = 'ADDED_NOTIFICATION_TO_QUEUE'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CLEAR_QUEUE = 'CLEAR_QUEUE'
export const CLEAR_PENDING_NOTIFICATION = 'CLEAR_PENDING_NOTIFICATION'
export const UPDATE_BADGE = 'UPDATE_BADGE'
export const BADGE_UPDATED = 'BADGE_UPDATED'

export const addNotificationToQueue = (streamerId) => ({
    type: ADDED_NOTIFICATION_TO_QUEUE,
    streamerId: streamerId
})

export const showNotification = () => ({
    type: SHOW_NOTIFICATION
})

export const clearQueue = () => ({
    type: CLEAR_QUEUE
})

export const clearPendingNotification = () => ({
    type: CLEAR_PENDING_NOTIFICATION
})

export const updateBadge = () => ({
    type: UPDATE_BADGE
})

export const badgeUpdated = () => ({
    type: BADGE_UPDATED
})
