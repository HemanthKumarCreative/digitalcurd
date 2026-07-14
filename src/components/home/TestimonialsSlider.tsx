'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper React styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TestimonialsSlider() {
  const testimonials = [
    { name: 'Caleb', role: 'CEO/Co-founder of Day Moon Development', img: '01.webp', text: 'Value Coders played a key role in helping our startup grow rapidly. Their development team delivered high-quality work, communicated exceptionally well, and onboarded to new projects quickly and smoothly. Their contributions made a meaningful impact on our growth. I would highly recommend them!' },
    { name: 'Judith Mueller', role: 'Executive Director, Mueller Health Foundation', img: '02.webp', text: 'The team at ValueCoders has provided us with exceptional services in creating this one-of-a-kind portal, and it has been a fantastic experience. I was particularly impressed by how efficiently and quickly the team always came up with creative solutions to provide us with all the functionalities within the portal we had requested.' },
    { name: 'James Kelly', role: 'Co-founder, Miracle Choice', img: '03.webp', text: 'The Project managers took a lot of time to understand our project before coming up with a contract or what they thought we needed. I had the reassurance from the start that the project managers knew what type of project I wanted and what my needs were. That is reassuring, and that\'s why we chose ValueCoders.' },
    { name: 'Kris Bruynson', role: 'Director, Storloft', img: '04.webp', text: 'ValueCoders had great technical expertise, both in front-end and back-end development. Their project management was well organized. Account management was friendly and always available. I would give ValueCoders ten out of ten!' },
    { name: 'Mohammed Mirza', role: 'Director, LOCALMASTERCHEFS LTD', img: '05.webp', text: 'Huge thank you to ValueCoders they have been a massive help in enabling us to start developing our project within a few weeks, so it\'s been great! There have been two small bumps in the road, but overall, It\'s been a fantastic service. I have already recommended it to one of my friends.' }
  ];

  return (
    <section className="client-feedback padding-t-120 padding-b-120" id="testimonails-v11">
      <div className="container">
        <div className="section-title">
          <em>CLIENT FEEDBACK</em>
          <h2>What Engineering Leaders Say</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          className="feedback-slider"
          loop={true}
          centeredSlides={true}
          slidesPerView={1.6}
          spaceBetween={30}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 1.3,
            }
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="feedback-card">
                <div className="client-image">
                  <img src={`https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/testimonails-v11/${t.img}`} alt={t.name} />
                </div>
                <div className="client-image before">
                  <img src={`https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/testimonails-v11/${t.img}`} alt={t.name} />
                </div>
                <div className="content">
                  <p>{t.text}</p>
                  <div className="clint-bio">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Arrows and Dots */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
}
