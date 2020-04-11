export const FETCH_STREAMS_SUCCESSFULLY = 'FETCH_STREAMS_SUCCESSFULLY'
export const FETCH_STREAMS_PENDING = 'FETCH_STREAMS_PENDING'
export const FETCH_STREAMS_ERROR = 'FETCH_STREAMS_ERROR'

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
