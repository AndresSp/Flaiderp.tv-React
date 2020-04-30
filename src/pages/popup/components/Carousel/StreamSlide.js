import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon } from 'semantic-ui-react';

const styles = {}

const StreamSlide = ({ index, image, header, description }) => {

    return (
        <Slide index={index}>
            <div style={{ padding: 5 }}>
                <Card fluid>
                    <Image hasMasterSpinner={true} src={image}/>
                    <Card.Content>
                        <Card.Header>{ header }</Card.Header>
                        <Card.Description>{ description }</Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </Slide>
    )
}

export default StreamSlide