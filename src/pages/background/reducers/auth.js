import { AUTH, AUTH_SUCCESSFULLY, AUTH_ERROR, CLEAR_TOKEN } from "../../../shared/actions/auth"

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
        
        case AUTH_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case CLEAR_TOKEN:
            return {
                ...state,
                accessToken: undefined
            }

        default:
            return state
    }
}


export const selectAuthPending = state => state.auth.pending;
export const selectAccessToken = state => state.auth.accessToken;