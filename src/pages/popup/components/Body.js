import React from 'react';
import { Container } from 'semantic-ui-react';
import Carousel from './Carousel/Carousel';

const styles = {
    container: {
        marginTop: '5em'
    }
}

const Body = (props) => (
    <Container style={styles.container}>
        <Carousel { ...props } />
    </Container>
)

export default Body