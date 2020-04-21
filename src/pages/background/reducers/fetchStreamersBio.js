import { FETCH_STREAMERS_BIO, FETCH_STREAMERS_BIO_SUCCESSFULLY, FETCH_STREAMERS_BIO_ERROR } from "../../../shared/actions/fetchStreamersBio"

const initialState = {
    pending: false,
    data: [],
    error: null
}

export const fetchStreamersBiosReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STREAMERS_BIO:
            return {
                ...state,
                pending: true
            }
        
        case FETCH_STREAMERS_BIO_SUCCESSFULLY:
            return {
                ...state,
                pending: false,
                data: action.payload.data
            }
        
        case FETCH_STREAMERS_BIO_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        default:
            return state
    }
}