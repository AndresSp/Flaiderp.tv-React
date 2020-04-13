export const FETCH_STREAMS = 'FETCH_STREAMS'
export const FETCH_STREAMS_SUCCESSFULLY = 'FETCH_STREAMS_SUCCESSFULLY'
export const FETCH_STREAMS_ERROR = 'FETCH_STREAMS_ERROR'

export const fetchStreams = (streamers) => ({
    type: FETCH_STREAMS,
    streamers: streamers
})

export const fetchStreamsSuccessfully = (response) => ({
    type: FETCH_STREAMS_SUCCESSFULLY,
    payload: response
})

export const fetchStreamsError = (error) => ({
    type: FETCH_STREAMS_ERROR,
    error: error
})
