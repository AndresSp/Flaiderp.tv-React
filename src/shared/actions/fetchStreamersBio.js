export const FETCH_STREAMERS_BIO = 'FETCH_STREAMERS_BIO'
export const FETCH_STREAMERS_BIO_SUCCESSFULLY = 'FETCH_STREAMERS_BIO_SUCCESSFULLY'
export const FETCH_STREAMERS_BIO_ERROR = 'FETCH_STREAMERS_BIO_ERROR'

export const fetchStreamersBio = (streamers) => ({
    type: FETCH_STREAMERS_BIO,
    streamers: streamers
})

export const fetchStreamersBioSuccessfully = (response) => ({
    type: FETCH_STREAMERS_BIO_SUCCESSFULLY,
    payload: response
})

export const fetchStreamersBioError = (error) => ({
    type: FETCH_STREAMERS_BIO_ERROR,
    error: error
})
