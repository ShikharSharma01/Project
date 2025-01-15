import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const SwiperBanner = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false ,pauseOnMouseEnter:true}}
            loop={true}
            effect={'fade'}
            fadeEffect={{ crossFade: true }}
            style={{ width: '100%' }}
        >
            <SwiperSlide style={{ width:'600px', height: '300px' }}>
                <img 
                     src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                     alt="Slide 1"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </SwiperSlide>
            <SwiperSlide style={{ width:'600px', height: '300px' }}>
                <img 
                     src="https://images.unsplash.com/photo-1592861956120-e524fc739696"
                     alt="Slide 2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </SwiperSlide>
            <SwiperSlide style={{ width:'600px', height: '300px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c"
                    alt="Slide 3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </SwiperSlide>
            <SwiperSlide style={{ width:'600px', height: '300px' }}>
                <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                    alt="Slide 3"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperBanner;