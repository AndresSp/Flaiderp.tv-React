export const AUTH = 'AUTH'
export const AUTH_SUCCESSFULLY = 'AUTH_SUCCESSFULLY'
export const AUTH_ERROR = 'AUTH_ERROR'
export const CLEAR_TOKEN = 'CLEAR_TOKEN'

export const auth = () => ({
    type: AUTH
})

export const authSuccessfully = (accessToken) => ({
    type: AUTH_SUCCESSFULLY,
    accessToken: accessToken
})

export const authError = (error) => ({
    type: AUTH_ERROR,
    error: error
})

export const clearToken = () => ({
    type: CLEAR_TOKEN
})