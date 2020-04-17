import configFile from "../../../assets/config/config.json";
import { MAIN_STREAM_SETTED, TOGGLE_STATUS, MAIN_STREAM_CLEARED, STREAMER_ENABLED, STREAMER_DISABLED } from "../../../shared/actions/config";

const initialState = configFile

export const configReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_STATUS:
            console.log('state', state)
            return {
                ...state,
                status: !state.status
            }

        case MAIN_STREAM_SETTED:
            const streamersObj1 = {
                ...state.streamers,
                main: action.streamer,
                ...(action.from ? { [action.from]: [ //Check origin
                    ...(state.streamers.main ? [state.streamers.main] : []), //Check null 
                    ...state.streamers[action.from].filter((streamer) => streamer !== action.streamer)
                ]} : {})
            }

            return {
                ...state,
                streamers: streamersObj1
            }
        
        case MAIN_STREAM_CLEARED:
            const streamersObj2 = {
                ...state.streamers,
                main: null,
                enabled: [
                    ...(state.streamers.main ? [state.streamers.main] : []), 
                    ...state.streamers.enabled
                ]
            }

            return {
                ...state,
                streamers: streamersObj2
            }
        
        case STREAMER_ENABLED:
            const streamersObj3 = {
                ...state.streamers,
                enabled: [
                    action.streamer,
                    ...state.streamers.enabled
                ],
                disabled: state.streamers.disabled.filter((streamer) => streamer !== action.streamer)
            }

            return {
                ...state,
                streamers: streamersObj3
            }

        case STREAMER_DISABLED:
            const streamersObj4 = {
                ...state.streamers,
                enabled: state.streamers.enabled.filter((streamer) => streamer !== action.streamer),
                disabled: [
                    action.streamer,
                    ...state.streamers.disabled
                ]
            }

            return {
                ...state,
                streamers: streamersObj4
            }

        default:
            return state
    }
}

export const selectStatus = state => state.config.status;
export const selectMainStreamer = state => state.config.streamers.main;
export const selectEnabledStreamers = state => state.config.streamers.enabled;
export const selectDisabledStreamers = state => state.config.streamers.disabled;