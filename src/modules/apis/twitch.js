import { CLIENT_ID } from "../../env.json";
import { ajax } from 'rxjs/ajax';

export const fetchStreamsByUserId = (userIds) => {

        const url = new URL('https://api.twitch.tv/helix/streams');
        userIds.map((userId) => url.searchParams.append('user_id', userId))
        
        return  ajax.getJSON(url.toString(), {
            'Content-Type': 'application/json',
            'Client-ID': CLIENT_ID
        })
}