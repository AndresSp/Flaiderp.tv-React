import React from 'react';
import { Slide, Image } from 'pure-react-carousel';
import { Card, Icon, Placeholder, Label, Segment, Embed } from 'semantic-ui-react';
import TwitchPlayerEmbed from './TwitchPlayerEmbed';
import { getBrowser } from '../../../../modules/apis/extension';
import {TwitchChat } from 'react-twitch-embed'

const styles = {}

class StreamSlide extends React.PureComponent {

    isFirefox;
    
    constructor(props){
        super(props)
        this.state = {
            isFirefox: getBrowser() === 'FIREFOX',
            chat: false
        };
    }

    imgPlaceHolder = () => (
        <Placeholder>
            <Placeholder.Image className='carousel-image-placeholder' />
        </Placeholder>
    )

    onPlay = () => this.setState({ chat: true })
    

    render(){
        
        const { index, showLive, channel, imageOnError, image, header, description, socials } = this.props
        return (
            <Slide index={index}>
                <div style={{ padding: 5 }}>
                    <Card  fluid>
                        { 
                            showLive ? 
                            (this.state.isFirefox? <a href={`https://www.twitch.tv/${channel}`} target='_blank'>
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
                                </a> : <TwitchPlayerEmbed preview={image} channel={channel} onPlay={this.onPlay} />) : 
                            <Image 
                            hasMasterSpinner={false} 
                            isBgImage={true} 
                            tag='div' 
                            renderLoading={this.imgPlaceHolder()}
                            renderError={imageOnError}
                            src={image} 
                            className='carousel-image'/>
                        }
                        <Card.Content className={this.state.chat ? 'carousel-content-chat' : 'carousel-content'}>
                        { this.state.chat ? 
                        <div className='chat-embed-container'>
                            <TwitchChat
                                channel={channel}
                                id={channel}
                                theme='dark'
                                parent={['chromiumapp.org']}
                                width='100%'
                                height={300}
                                scrolling='true'
                                style={{position: 'relative', marginTop: '-135px'}}
                                />
                        </div> : (
                            <React.Fragment>
                                <Card.Header className='carousel-header'>
                                { header } 
                                <Label 
                                style={{ marginLeft: '5px' }} 
                                size='tiny' 
                                color={showLive ? 'green' : 'grey' } 
                                horizontal>{showLive ? 'LIVE' : 'OFF'}</Label>
                                {/* <Label
                                size='tiny'
                                color='purple'>
                                CHAT
                                </Label> */}
                                </Card.Header>
                                <Card.Description className='carousel-description'>
                                    { description }
                                </Card.Description>
                            </React.Fragment>
                        )
                        }
                        </Card.Content>
                        {
                            this.state.chat ? '' :
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
                        }
                    </Card>
                </div>
            </Slide>
        )
    }
}

export default StreamSlide