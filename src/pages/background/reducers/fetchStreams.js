import { FETCH_STREAMS, FETCH_STREAMS_SUCCESSFULLY, FETCH_STREAMS_ERROR, FETCH_STREAMS_CLEARED, FETCH_STREAMS_UNAUTHORIZED_ERROR } from "../../../shared/actions/fetchStreams"


const initialState = {
    pending: false,
    data: [],
    error: null
}

export const fetchStreamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {
                ...state,
                pending: true
            }
        
        case FETCH_STREAMS_SUCCESSFULLY:
            return {
                ...state,
                pending: false,
                data: action.payload.data,
                error: null
            }
        
        case FETCH_STREAMS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case FETCH_STREAMS_CLEARED:
            return {
                ...state,
                data:[]
            }
        
        default:
            return state
    }
}

export const selectStreams = state => state.fetchStreams.present.data;
export const selectStreamsPending = state => state.pending;
export const selectStreamsError = state => state.error;
