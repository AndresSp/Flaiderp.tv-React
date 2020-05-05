import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import StreamSlide from './StreamSlide';
import PlaceholderSlide from './PlaceholderSlide';

const styles = {}

const getThumbnailURL = (thumbnail_url, width, height) => {
    return thumbnail_url
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
}

const Carousel = ({ streamsFeed, main }) => (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={0.97}
    totalSlides={streamsFeed.length}
    isPlaying={true}
    infinite={true}
    hasMasterSpinner={false}>
        <Slider spinner={() => <PlaceholderSlide/>}>
            {
                Array.from(streamsFeed).map(({online, id, thumbnail_url, profile_image_url, display_name, title, description}, idx) => (
                    <StreamSlide 
                    key={id} 
                    index={idx}
                    image={ online ? getThumbnailURL(thumbnail_url, 698, 393) : profile_image_url }
                    header={display_name}
                    description={ online ? title : description }
                />
                ))
            }
        </Slider>
        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
    </CarouselProvider>
)

export default Carousel