import { fetchStreamsPending, fetchStreamsError, fetchStreamsSuccessfully } from "../shared/actions/getStreams";


export const getStreams = (CLIENT_ID, userIds) => {
    return dispatch => {
        dispatch(fetchStreamsPending())

        const url = new URL('https://api.twitch.tv/helix/streams');
        userIds.map((userId) => url.searchParams.append('user_id', userId))
        
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Client-ID': CLIENT_ID
            }
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error(response.status)
        })
        .then((data) => dispatch(fetchStreamsSuccessfully(data)))
        .catch((error) => dispatch(fetchStreamsError(error)))
    }
}