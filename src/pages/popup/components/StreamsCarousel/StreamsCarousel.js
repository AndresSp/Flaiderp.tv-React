import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import StreamSlide from './StreamSlide';
import PlaceholderSlide from './PlaceholderSlide';
import socials from './../../../../socials.json'

const styles = {}

const getThumbnailURL = (thumbnail_url, width, height) => {
    return thumbnail_url
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
}

const StreamsCarousel = ({ streamsFeed, main }) => (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.15}
    totalSlides={streamsFeed.length}
    isPlaying={true}
    infinite={true}
    hasMasterSpinner={false}>
        <Slider spinner={() => <PlaceholderSlide/>}>
            {
                Array.from(streamsFeed).map(({online, id, user_name, thumbnail_url, profile_image_url, display_name, title, description}, idx) => (
                    <StreamSlide 
                    key={id} 
                    index={idx}
                    showLive={online}
                    channel={user_name}
                    imageOnError={ profile_image_url }
                    image={ online ? getThumbnailURL(thumbnail_url, 698, 393) : profile_image_url }
                    header={display_name}
                    description={ online ? title : description }
                    socials={socials[id]}
                />
                ))
            }
        </Slider>
        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
    </CarouselProvider>
)

export default StreamsCarousel