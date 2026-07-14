'use client';

import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Initial state is 0, so it's already correct. No need to call onSelect synchronously.
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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

        <div className="feedback-slider embla" ref={emblaRef} style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="swiper-wrapper embla__container" style={{ display: 'flex' }}>
            {testimonials.map((t, i) => (
              <div className="swiper-slide embla__slide" key={i} style={{ flex: '0 0 auto', minWidth: 0 }}>
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
              </div>
            ))}
          </div>

          <div className="swiper-button-prev" onClick={scrollPrev}></div>
          <div className="swiper-button-next" onClick={scrollNext}></div>
          
          <div className="swiper-pagination">
            {testimonials.map((_, i) => (
              <span key={i} className={`swiper-pagination-bullet ${i === selectedIndex ? 'swiper-pagination-bullet-active' : ''}`} onClick={() => emblaApi && emblaApi.scrollTo(i)}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
