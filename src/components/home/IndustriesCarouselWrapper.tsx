'use client';

import dynamic from 'next/dynamic';

const IndustriesCarousel = dynamic(() => import('./IndustriesCarousel'), {
  ssr: false,
});

export default function IndustriesCarouselWrapper() {
  return <IndustriesCarousel />;
}
