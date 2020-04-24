export const ADDED_NOTIFICATION_TO_QUEUE = 'ADDED_NOTIFICATION_TO_QUEUE'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CLEAR_PENDING_NOTIFICATION = 'CLEAR_PENDING_NOTIFICATION'

export const addNotificationToQueue = (streamerId) => ({
    type: ADDED_NOTIFICATION_TO_QUEUE,
    streamerId: streamerId
})

export const showNotification = () => ({
    type: SHOW_NOTIFICATION
})

export const clearPendingNotification = () => ({
    type: CLEAR_PENDING_NOTIFICATION
})