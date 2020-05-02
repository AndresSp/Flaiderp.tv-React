import React from 'react';
import { Container } from 'semantic-ui-react';
import Carousel from './Carousel/Carousel';

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

const Body = ({ streamersBio, streams, mainStreamer }) => (
    <Container style={styles.container}>
        <Carousel streamsFeed={ carouselFeed(streamersBio, streams, mainStreamer) } />
    </Container>
)

export default Body