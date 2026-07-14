'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

export default function IndustriesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1, breakpoints: { '(min-width: 768px)': { slidesToScroll: 2 }, '(min-width: 1024px)': { slidesToScroll: 3 } } });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const industries = [
    { name: 'Healthcare', link: '/industries/healthcare', img: 'healthcare.webp', title: 'Smarter Care, Better Outcomes', desc: 'Innovative software solutions to improve patient care.' },
    { name: 'Media & Entertainment', link: '/industries/media-entertainment', img: 'media.webp', title: 'Improve Engagement', desc: 'Engagement-focused software to enhance content delivery.' },
    { name: 'Retail & eCommerce', link: '/industries/retail-ecommerce', img: 'ecom.webp', title: 'Scalable Tech for Seamless Sales', desc: 'Scalable B2B & B2C solutions for your business.' },
    { name: 'FinTech', link: '/industries/fintech', img: 'fintech.webp', title: 'Innovating Finance, Empowering Growth', desc: 'Next-gen software to revolutionize financial services.' },
    { name: 'Education & eLearning', link: '/industries/edtech', img: '../industries-v6.0/education.webp', title: 'Smart Learning', desc: 'Custom eLearning solutions to meet changing industry needs.' },
    { name: 'Travel & Hospitality', link: '/industries/travel', img: 'hospitality.webp', title: 'Seamless Travel Experiences', desc: 'Booking and personalization platforms that drive loyalty.' },
    { name: 'Logistics & Supply Chain', link: '/industries/logistics', img: 'logistic.webp', title: 'Smarter Supply Chain Operations', desc: 'Real-time tracking and automation for efficient logistics.' },
    { name: 'Insurance', link: '/industries/insurance', img: 'insurance.webp', title: 'Digital Insurance, Simplified', desc: 'Scalable systems for modern insurance operations.' },
    { name: 'Automotive', link: '#', img: 'automobile.webp', title: 'Connected Mobility Solutions', desc: 'Build smart, connected, and scalable automotive systems.' },
  ];

  return (
    <section className="industries-section padding-t-120 padding-b-120" id="cp-industry-v10">
      <div className="container">
        <div className="section-header">
          <div className="header-text">
            <h2>Industries We Cater to</h2>
            <p>Get what you are looking for to fulfill your software development and outsourcing needs at ValueCoders, with our expertise on all in-demand technologies &amp; platforms.</p>
          </div>
          <div className="glider-nav">
            <button className="glider-prev" aria-label="Previous" onClick={scrollPrev}>
              <img src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/icons/arrow-right.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="glider-next" aria-label="Next" onClick={scrollNext}>
              <img src="https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/icons/arrow-right.svg" alt="" />
            </button>
          </div>
        </div>
        
        <div className="glider-contain embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div className="glider embla__container" style={{ display: 'flex' }}>
            {industries.map((ind, i) => (
              <div className="industry-item embla__slide" key={i} style={{ flex: '0 0 auto', minWidth: 0, paddingRight: '20px' }}>
                <div className="industry-card">
                  <div className="card-image">
                    <img src={`https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/industries-v10/${ind.img}`} alt={ind.name} />
                  </div>
                  <div className="card-body">
                    <div className="title-wrap">
                      <h3><Link href={ind.link}>{ind.name}</Link></h3>
                    </div>
                    <div className="hover-content">
                      <div className="inner-top">
                        <h4>{ind.title}</h4>
                        <p>{ind.desc}</p>
                      </div>
                      <Link href={ind.link} className="expand-btn">Expand</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
