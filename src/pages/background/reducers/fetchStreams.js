import { FETCH_STREAMS, FETCH_STREAMS_SUCCESSFULLY, FETCH_STREAMS_ERROR } from "../../../shared/actions/fetchStreams"


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
                data: action.payload.data
            }
        
        case FETCH_STREAMS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        
        default:
            return state
    }
}

export const selectStreams = state => state.fetchStreams.data;
export const selectStreamsPending = state => state.pending;
export const selectStreamsError = state => state.error;
