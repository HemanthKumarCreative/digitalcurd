import React from 'react';

export default function ClientLogosSlider() {
  return (
    <div className="slide-logo-part dis-flex items-center justify-sb">
      <div className="container">
        <div className="dis-flex">
          <div className="logo-heading">
            <h4>
              <span>Trusted by Businesses Ready to <strong>Grow</strong> Smarter</span>
            </h4>
          </div>
          <div className="logo-slider">
            <div className="logo-track">
              {/* Duplicate the array to create a seamless infinite scroll effect */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {[
                    "https://cdn.simpleicons.org/react",
                    "https://cdn.simpleicons.org/nextdotjs/000000",
                    "https://cdn.simpleicons.org/vercel/000000",
                    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
                    "https://cdn.simpleicons.org/github/000000",
                    "https://cdn.simpleicons.org/figma",
                    "https://cdn.simpleicons.org/google",
                    "https://cdn.simpleicons.org/googlecloud"
                  ].map((src, index) => (
                    <div key={index} className="logos">
                      <img src={src} alt="Client Logo" loading="lazy" />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
