import React from 'react';
import { Container, Card, Placeholder, CardContent } from 'semantic-ui-react';
import OauthModal from './Modal/OauthModal';
import Carousel from './StreamsCarousel/StreamsCarousel';
import PlaceholderSlide from './StreamsCarousel/PlaceholderSlide';

const styles = {
    container: {
        marginTop: '5em'
    }
}

const carouselFeed = (streamersBio, streams, main) => {
    
    const bioWithStreamsON = Array.from(streamersBio).map((bio) => {
        const streamOn = findStreamON(bio.id, streams)
        return {
            ...bio,
            ...streamOn,
            ...streamOn ? { online: true } : { online: false }
        }
    })

    bioWithStreamsON.sort((a, b) => b.online - a.online)

    if(main && main.length && main[0]){
        const idxFound = bioWithStreamsON.findIndex((el) => el.online && el.user_id == main[0])
        if(idxFound > -1){
            const mainStream = bioWithStreamsON.splice(idxFound, 1)[0]
            bioWithStreamsON.unshift(mainStream)
        }

    }

        console.log(bioWithStreamsON)
        return [...bioWithStreamsON]
    }

const findStreamON = (id, streams) => streams.find((stream) => stream.user_id == id)

const Body = ({ streamersBio, streams, mainStreamer, accessToken, authPending, onAuthorize }) => {
    const feed = carouselFeed(streamersBio, streams, mainStreamer)
    return (
    <Container style={styles.container}>
        <OauthModal hasAccessToken={ !!accessToken } pending={ authPending } onAuth={ onAuthorize }/>
        { 
            feed.length > 0 ? 
            <Carousel streamsFeed={ feed } /> :
            <PlaceholderSlide/>
        }
    </Container>
)}

export default Body