import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext  } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import StreamSlide from './StreamSlide';

const styles = {}
// broadcaster_type: "partner"
// description: "Hola! Soy Jazmin (Flaiveth) Cosplayer y Streamer Mexicana, espero pasemos momentos divertidos juntos :3"
// display_name: "Flaiveth"
// game_id: "509658"
// id: "37787574848"
// language: "es"
// login: "flaiveth"
// offline_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/flaiveth-channel_offline_image-213ca26ac5ea93ca-1920x1080.png"
// profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/ada59f31-4879-4493-8e91-0cf3502cc8fe-profile_image-300x300.jpg"
// started_at: "2020-04-30T01:31:04Z"
// tag_ids: ["d4bb9c58-2141-4881-bcdc-3fe0505457d1"]
// thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_flaiveth-{width}x{height}.jpg"
// title: "Rifa de códigos de mordekaiser y Leblanc! #LPP #LeaguePartner | alertas 100, 500, 911,1000,2000,5000,6969,10000bits"
// type: "live"
// user_id: "144360146"
// user_name: "Flaiveth"
// view_count: 875028
// viewer_count: 55

const getThumbnailURL = (thumbnail_url, width, height) => {
    return thumbnail_url
    .replace('{width}', `${width}`)
    .replace('{height}', `${height}`)
}

const Carousel = ({ streamsFeed }) => (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.04}
    totalSlides={streamsFeed.length}
    isPlaying={true}
    infinite={true}
    hasMasterSpinner={true}>
        <Slider>
            {
                Array.from(streamsFeed).map(({user_id, thumbnail_url, display_name, description}, idx) => (
                    <StreamSlide 
                    key={user_id} 
                    index={idx}
                    image={getThumbnailURL(thumbnail_url, 698, 393)}
                    header={display_name}
                    description={description}
                />
                ))
            }
        </Slider>
        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
    </CarouselProvider>
)

export default Carousel