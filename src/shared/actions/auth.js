export const AUTH = 'AUTH'
export const AUTH_SUCCESSFULLY = 'AUTH_SUCCESSFULLY'
export const AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED'
export const AUTH_ERROR = 'AUTH_ERROR'

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