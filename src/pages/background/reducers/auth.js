import { AUTH, AUTH_SUCCESSFULLY, AUTH_ERROR, AUTH_UNAUTHORIZED } from "../../../shared/actions/auth"

const initialState = {
    pending: false,
    accessToken: undefined,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                pending: true
            }
        
        case AUTH_SUCCESSFULLY:
            return {
                ...state,
                pending: false,
                accessToken: action.accessToken,
                error: null
            }

        case AUTH_UNAUTHORIZED:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        
        case AUTH_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state
    }
}

export const selectAccessToken = state => state.auth.accessToken;