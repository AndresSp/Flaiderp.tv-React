import configFile from "../../../assets/config/config.json";
import { MAIN_STREAM_SETTED, TOGGLE_STATUS } from "../../../shared/actions/config";

const initialState = configFile

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_STATUS:
            return {
                ...state,
                status: !state.status
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

export const selectStatus = state => state.config.status;
export const selectEnabledStreamers = state => state.config.streamers.enabled;