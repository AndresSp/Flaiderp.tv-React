import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon, Placeholder, Label, Segment } from 'semantic-ui-react';
import TwitchPlayerEmbed from './TwitchPlayerEmbed';
import { getBrowser } from '../../../../modules/apis/extension';

const styles = {}

class StreamSlide extends React.PureComponent {

    isFirefox;
    
    constructor(props){
        super(props)
        this.isFirefox = getBrowser() === 'FIREFOX'
    }

    imgPlaceHolder = () => (
        <Placeholder>
            <Placeholder.Image className='carousel-image-placeholder' />
        </Placeholder>
    )
    

    render(){
        
        const { index, showLive, channel, imageOnError, image, header, description, socials } = this.props
        return (
            <Slide index={index}>
                <div style={{ padding: 5 }}>
                    <Card  fluid>
                        { 
                            showLive ? 
                            (this.isFirefox? <a href={`https://www.twitch.tv/${channel}`} target='_blank'>
                                    <Image 
                                    hasMasterSpinner={false} 
                                    isBgImage={true} 
                                    tag='div' 
                                    renderLoading={this.imgPlaceHolder()}
                                    renderError={imageOnError}
                                    src={image} 
                                    className='carousel-image'>
                                            <Icon name='external' inverted size='big' color='grey'/>
                                    </Image>
                                </a> : <TwitchPlayerEmbed preview={image} channel={channel} />) : 
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
                            {
                                (socials ? Object.keys(socials).map((social, i) => (
                                    <a key={i} href={socials[social]} target="_blank">
                                        {
                                            social.includes('custom') ? 
                                            <Icon circular className={`social ${social}`}/> :
                                            <Icon name={social} circular className={'social'}/>
                                        }
                                    </a>)) : '')
                            }
                        </Card.Content>
                    </Card>
                </div>
            </Slide>
        )
    }
}

export default StreamSlide