import { CLIENT_ID } from "../../env.json";
import { ajax } from 'rxjs/ajax';
const baseUrl = 'https://api.twitch.tv/helix'

export const fetchStreamsByUserId = (userIds) => {

        const url = new URL(`${baseUrl}/streams`);
        userIds.map((userId) => url.searchParams.append('user_id', userId))
        
        return  ajax.getJSON(url.toString(), {
            'Content-Type': 'application/json',
            'Client-ID': CLIENT_ID
        })
}

export const fetchStreamersInfo = (userIds) => {

    const url = new URL(`${baseUrl}/users`);
    userIds.map((userId) => url.searchParams.append('id', userId))
    
    return  ajax.getJSON(url.toString(), {
        'Content-Type': 'application/json',
        'Client-ID': CLIENT_ID
    })
}