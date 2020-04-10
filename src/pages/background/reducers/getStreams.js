import { FETCH_STREAMS_PENDING, FETCH_STREAMS_SUCCESSFULLY, FETCH_STREAMS_ERROR } from "../../../shared/actions/getStreams"


const initialState = {
    pending: false,
    streams: [],
    error: null
}

export const getStreamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STREAMS_PENDING:
            return {
                ...state,
                pending: true
            }
        
        case FETCH_STREAMS_SUCCESSFULLY:
            return {
                ...state,
                pending: false,
                streams: action.payload.data
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

export const selectStreams = state => state.streams;
export const selectStreamsPending = state => state.pending;
export const selectStreamsError = state => state.error;
