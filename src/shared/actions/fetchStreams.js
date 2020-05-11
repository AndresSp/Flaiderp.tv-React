export const FETCH_STREAMS = 'FETCH_STREAMS'
export const FETCH_STREAMS_SUCCESSFULLY = 'FETCH_STREAMS_SUCCESSFULLY'
export const FETCH_STREAMS_UNAUTHORIZED_ERROR = 'FETCH_STREAMS_UNAUTHORIZED_ERROR'
export const FETCH_STREAMS_ERROR = 'FETCH_STREAMS_ERROR'
export const FETCH_STREAMS_CLEARED = 'FETCH_STREAMS_CLEARED'
export const CHECK_DIFF_STREAMS = 'CHECK_DIFF_STREAMS'

export const fetchStreams = (streamers) => ({
    type: FETCH_STREAMS,
    streamers: streamers
})

export const fetchStreamsSuccessfully = (response) => ({
    type: FETCH_STREAMS_SUCCESSFULLY,
    payload: response
})

export const fetchStreamsUnauthorizedError = (error) => ({
    type: FETCH_STREAMS_UNAUTHORIZED_ERROR,
    error: error
})

export const fetchStreamsError = (error) => ({
    type: FETCH_STREAMS_ERROR,
    error: error
})

export const fetchStreamsCleared = () => ({
    type: FETCH_STREAMS_CLEARED
})

export const checkDiffStreams = () => ({
    type: CHECK_DIFF_STREAMS
})
