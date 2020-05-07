import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon, Placeholder, Label, Segment } from 'semantic-ui-react';
import TwitchPlayerEmbed from './TwitchPlayerEmbed';

const styles = {}

class StreamSlide extends React.PureComponent {
    constructor(props){
        super(props)
    }

    imgPlaceHolder = () => (
        <Placeholder>
            <Placeholder.Image className='carousel-image-placeholder' />
        </Placeholder>
    )

    

    render(){
        
        const { index, showLive, channel, imageOnError, image, header, description } = this.props

        return (
            <Slide index={index}>
                <div style={{ padding: 5 }}>
                    <Card  fluid>
                        { 
                            showLive ? 
                            <TwitchPlayerEmbed preview={image} channel={channel}/> : 
                            <Image 
                            hasMasterSpinner={false} 
                            isBgImage={true} 
                            tag='div' 
                            renderLoading={this.imgPlaceHolder()}
                            renderError={imageOnError}
                            src={image} 
                            className='carousel-image'/>
                        }
                        <Card.Content className='carousel-content'>
                            <Card.Header className='carousel-header'>
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
                        <Card.Content className='carousel-extra' extra>
                            <a>
                                <Icon name='twitch' circular className={'social'}/>
                            </a>
                            <a>
                                <Icon name='youtube' circular className={'social'}/>
                            </a>
                            <a>
                                <Icon name='discord' circular className={'social'}/>
                            </a>
                        </Card.Content>
                    </Card>
                </div>
            </Slide>
        )
    }
}

export default StreamSlide