import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon, Placeholder } from 'semantic-ui-react';

const styles = {}

const StreamSlide = ({ index, image, header, description }) => {

    const imgPlaceHolder = () => (
    <Placeholder>
        <Placeholder.Image className='carousel-image-placeholder' />
    </Placeholder>)

    return (
        <Slide index={index}>
            <div style={{ padding: 5 }}>
                <Card fluid>
                    <Image hasMasterSpinner={false} isBgImage={true} tag='div' renderLoading={imgPlaceHolder} src={image} className='carousel-image'/>
                    <Card.Content className='carousel-content'>
                        <Card.Header>{ header }</Card.Header>
                        <Card.Description className='carousel-description'>
                            { description }
                            </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </Slide>
    )
}

export default StreamSlide