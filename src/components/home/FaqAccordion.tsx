'use client';

import React, { useState } from 'react';

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What kind of companies do you typically work with?',
      answer: (
        <>
          <p>We serve 30+ industries across the globe. However, most of our clients come from the following company types:</p>
          <ul>
            <li>Tech product companies</li>
            <li>Non-technical founders with vision, funding, no engineers</li>
            <li>India-based GCCs needing scale, structure, or independent workstreams</li>
            <li>Non-tech companies modernizing legacy revenue-generating systems</li>
            <li>Early-stage founders building concept to first working product</li>
          </ul>
        </>
      ),
    },
    {
      question: 'How quickly can you start a project or onboard engineers?',
      answer: <p>We always keep a pool of trained engineers ready. When you reach out to us for a project or to hire an engineer, everything from screening to onboarding is done within two weeks.</p>,
    },
    {
      question: 'How does your team ensure quality and delivery predictability?',
      answer: <p>We hire engineers after rigorous talent screening and keep them updated with the latest tools and trends. This ensures our partners only get the best talent. The structured onboarding and performance tracking further ensure that quality and delivery expectations are met.</p>,
    },
    {
      question: 'What does "AI-Augmented, Human-Governed" delivery mean?',
      answer: <p>It means AI is used to do repetitive and low-impact tasks, while our engineers and leads handle decisions, check code quality, and own outcomes.</p>,
    },
    {
      question: 'What if I want to replace an engineer?',
      answer: <p>You get a replacement within 48 hours.</p>,
    },
    {
      question: 'Do you work with startups or only large enterprises?',
      answer: <p>Both. Startups partner with us to move faster without building a large team. Large enterprises rely on us to improve capacity and meet deadlines.</p>,
    },
    {
      question: 'How does ValueCoders handle changing requirements or scope?',
      answer: <p>We adapt without chaos. We realign the priorities and ensure that work continues without disrupting timelines.</p>,
    },
    {
      question: 'How do I get started with ValueCoders?',
      answer: <p>If you want to outsource a software project, hire an engineer or a team, please share your requirements. We will get back to you within 8 business hours.</p>,
    },
  ];

  return (
    <section className="faq-section-v10 padding-t-120 padding-b-120">
      <div className="container">
        <div className="inner-part">
          {/* LEFT CONTENT */}
          <div className="faq-left">
            <h2>Frequently Asked<br /><em>Questions</em></h2>
            <p>Here is the list of some of the most common questions we hear before any engagement. If your query is not listed here, contact us and we will get back to you within 24 hours.</p>
          </div>
          {/* RIGHT ACCORDION */}
          <div className="faq-right">
            {faqs.map((faq, index) => (
              <div 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                key={index}
              >
                <div 
                  className="faq-question" 
                  onClick={() => toggleAccordion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{faq.question}</h3>
                  <span className="icon"></span>
                </div>
                <div 
                  className="faq-answer"
                  style={{ display: activeIndex === index ? 'block' : 'none' }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
