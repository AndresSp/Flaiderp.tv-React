import configFile from "../../../assets/config/config.json";
import { STATUS_ENABLED, STATUS_DISABLED, MAIN_STREAM_SETTED } from "../../../shared/actions/config";

const initialState = configFile

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUS_ENABLED:
            return {
                ...state,
                status: true
            }

        case STATUS_DISABLED:
            return {
                ...state,
                status: false
            }
        
        case MAIN_STREAM_SETTED:
            const streamers = {
                ...state.streamers,
                main: action.mainStreamer
            }

            return {
                ...state,
                streamers: streamers
            }

        default:
            return state
    }
}