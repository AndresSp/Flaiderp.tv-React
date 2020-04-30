import React from 'react';
import { Container } from 'semantic-ui-react';
import Carousel from './Carousel/Carousel';

const styles = {
    container: {
        marginTop: '5em'
    }
}

const carouselFeed = (streams, streamersBio) => {
    const streamsWithBio = streams.map((stream) => ({
        ...findBio(stream.user_id, streamersBio),
        ...stream
    }))
        return [...streamsWithBio]
    }

const findBio = (userId, streamersBio) => streamersBio.find((streamer) => streamer.id == userId)

const Body = ({ streams, streamersBio }) => (
    <Container style={styles.container}>
        <Carousel streamsFeed= { carouselFeed(streams, streamersBio) } />
    </Container>
)

export default Body