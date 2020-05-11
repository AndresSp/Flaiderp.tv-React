import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ButtonFirst, ButtonLast, ButtonPlay  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import StreamSlide from './StreamSlide';
import PlaceholderSlide from './PlaceholderSlide';
import socials from './../../../../socials.json'
import { Icon, Button } from 'semantic-ui-react';

const styles = {}

const getThumbnailURL = (thumbnail_url, width, height) => {
    return thumbnail_url
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
}

const StreamsCarousel = ({ streamsFeed, main }) => (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.05}
    totalSlides={streamsFeed.length}
    isPlaying={true}
    infinite={true}
    hasMasterSpinner={false}>
        <Slider spinner={() => <PlaceholderSlide/>}>
            {
                Array.from(streamsFeed).map(({online, id, user_name, thumbnail_url, profile_image_url, display_name, title, description}, idx) => (
                    <StreamSlide 
                    key={id}
                    id={id} 
                    index={idx}
                    showLive={online}
                    channel={user_name}
                    imageOnError={ profile_image_url }
                    image={ online ? getThumbnailURL(thumbnail_url, 698, 393) : profile_image_url }
                    header={display_name}
                    description={ online ? title : description }
                    socials={socials[id]}/>
                ))
            }
        </Slider>
        <div className='carousel-controls'>
                <ButtonFirst className='control bg-light-accent txt-dark-theme'>
                    <Icon name='angle double left' className='control-icon'/>
                </ButtonFirst>

                <ButtonBack className='control bg-light-accent txt-dark-theme'>
                    <Icon name='angle left' className='control-icon'/>
                </ButtonBack>

                <ButtonPlay
                className='control bg-light-accent txt-dark-theme'
                childrenPlaying={<Icon name='pause circle' className='control-icon'/>}
                childrenPaused={<Icon name='play circle' className='control-icon'/>}>
                </ButtonPlay>

                <ButtonNext className='control bg-light-accent txt-dark-theme'>
                    <Icon name='angle right' className='control-icon'/>
                </ButtonNext>

                <ButtonLast className='control bg-light-accent txt-dark-theme'>
                    <Icon name='angle double right' className='control-icon'/>
                </ButtonLast>
        </div>
    </CarouselProvider>
)

export default StreamsCarousel