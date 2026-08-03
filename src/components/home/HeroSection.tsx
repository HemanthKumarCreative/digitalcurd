'use client';

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export default function HeroSection() {
  return (
    <>
      <section 
        className="hero-section relative isolate flex items-center pt-[145px] pb-[70px] min-h-[100vh] lg:min-h-[auto] w-full"
      >
        {/* Background Layer to avoid z-index bleeding */}
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center hidden lg:block" 
          style={{ backgroundImage: "url('https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/home-v10/hero-banner.webp')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#05164d_0%,#0c33b3_100%)] lg:hidden" />

        <div className="container max-w-[1160px] mx-auto px-4 w-full">
          <div className="dis-flex flex flex-wrap items-center">
            
            {/* Left Box */}
            <div className="left-box basis-full lg:basis-[80%] text-left">
              <h1 className="text-[40px] leading-[50px] lg:text-[70px] lg:leading-[1.3] !text-white mb-5 font-bold">
                Transform Your Business for the AI Era
              </h1>
              <h3 className="!text-white mb-5 text-[26px] font-semibold">
                AI-Powered Growth. Intelligent Digital Experiences.
              </h3>
              <p className="mt-5 text-[16px] leading-[27px] lg:text-[18px] lg:leading-[30px] !text-white/90 font-normal">
                We help startups, growing businesses, ecommerce brands, healthcare organizations, manufacturers, and enterprises build intelligent growth systems that attract customers, increase revenue, automate operations, and deliver exceptional customer experiences.
              </p>
              
              <div className="primary_btn mt-[30px] mb-[70px] flex justify-start">
                <Link 
                  href="https://www.valuecoders.com/contact"
                  className="inline-flex items-center rounded-full border border-white bg-transparent hover:bg-[#1D5BC4] hover:border-[#1D5BC4] !text-white h-auto px-[15px] py-[11.5px] font-medium text-[14px] leading-[1.1] transition-colors cursor-pointer"
                >
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Running Bar / Awards Marquee */}
      <section className="running-bar">
        <div className="awards-marquee-track">
          <div className="awards-marquee-inner">
            
            {/* Repeat the awards to create a seamless marquee loop */}
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {[
                  "Digital Transformation Consulting",
                  "AI Business Solutions",
                  "Digital Marketing",
                  "Shopify & Ecommerce",
                  "Website & Web Applications",
                  "WhatsApp Automation",
                  "Power BI & Business Intelligence",
                  "Marketing Automation",
                  "Branding & Creative"
                ].map((award, index) => (
                  <div key={index} className="award-tile">
                    <span>
                      {award}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
            
          </div>
        </div>
      </section>
    </>
  );
}
