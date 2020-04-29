import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext  } from 'pure-react-carousel';
import {  } from 'semantic-ui-react';
import 'pure-react-carousel/dist/react-carousel.es.css';

const styles = {}

class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1}
            totalSlides={3}
            isPlaying={true}
            infinite={true}>
                <Slider>
                    <Slide index={0}>
                        <div>1</div>
                    </Slide>
                    <Slide index={1}>
                        <div>2</div>
                    </Slide>
                    <Slide index={2}>
                        <div>3</div>
                    </Slide>
                </Slider>
                {/* <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext> */}
            </CarouselProvider>
        ) 
    }
}

export default Carousel