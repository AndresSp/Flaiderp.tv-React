import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon, Placeholder, Label, Segment } from 'semantic-ui-react';

const styles = {}

const StreamSlide = ({ index, showLive, imageOnError, image, header, description }) => {

    const imgPlaceHolder = () => (
    <Placeholder>
        <Placeholder.Image className='carousel-image-placeholder' />
    </Placeholder>)

    return (
        <Slide index={index}>
            <div style={{ padding: 5 }}>
                <Card raised={true} fluid>
                    <Image hasMasterSpinner={false} 
                    isBgImage={true} tag='div' 
                    renderLoading={imgPlaceHolder}
                    renderError={imageOnError}
                    src={image} className='carousel-image'>
                    {
                        showLive ?
                        (<Label attached='top' size='mini' color='green'>EN DIRECTO</Label>) : ''
                    }
                    </Image>
                    <Card.Content className='carousel-content'>
                        <Card.Header>
                            { header } 
                            <Label 
                            style={{ marginLeft: '5px' }} 
                            size='tiny' 
                            color={showLive ? 'green' : 'grey' } 
                            horizontal>{showLive ? 'LIVE' : 'OFF'}</Label>
                        </Card.Header>
                        <Card.Description className='carousel-description'>
                            { description }
                            </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon circular link name='twitch' />
                        </a>
                    </Card.Content>
                </Card>
            </div>
        </Slide>
    )
}

export default StreamSlide