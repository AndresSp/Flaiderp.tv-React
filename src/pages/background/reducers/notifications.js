import { ADDED_NOTIFICATION_TO_QUEUE, SHOW_NOTIFICATION, CLEAR_PENDING_NOTIFICATION } from "../../../shared/actions/notifications"

const initialState = {
    queue: [],
    pending: undefined
}

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDED_NOTIFICATION_TO_QUEUE:
            const newQ1 = [...state.queue]
            newQ1.push(action.streamerId)
            return {
                ...state,
                queue: newQ1
            }

        case SHOW_NOTIFICATION:
            const newQ2 = [...state.queue]
            const notificationToShow = newQ2.shift()
            return {
                ...state,
                queue: newQ2,
                pending: notificationToShow
            }

        case CLEAR_PENDING_NOTIFICATION:
            return {
                ...state,
                pending: undefined
            }

        default:
            return state
    }
}