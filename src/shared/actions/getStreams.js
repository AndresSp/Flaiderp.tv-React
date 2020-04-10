export const FETCH_STREAMS_SUCCESSFULLY = 'GET_STREAMS_STATUS_SUCCESSFULLY'
export const FETCH_STREAMS_PENDING = 'GET_STREAMS_STATUS_PENDING'
export const FETCH_STREAMS_ERROR = 'GET_STREAMS_STATUS_ERROR'

export const fetchStreamsPending = () => ({
    type: FETCH_STREAMS_PENDING
})

export const fetchStreamsSuccessfully = (response) => ({
    type: FETCH_STREAMS_SUCCESSFULLY,
    payload: response
})

export const fetchStreamsError = (error) => ({
    type: FETCH_STREAMS_ERROR,
    error: error
})
