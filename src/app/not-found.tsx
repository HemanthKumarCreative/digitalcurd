'use client';

import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      /* Use the exact brand Navy background so the transparent header looks perfect */
      backgroundColor: '#05164D', 
      position: 'relative',
      overflow: 'hidden',
      /* Safe padding to guarantee it never touches the fixed header (top) or the footer (bottom) */
      paddingTop: '140px',
      paddingBottom: '80px',
      minHeight: '60vh'
    }}>
      {/* Background Decorative Gradient similar to Home Page Hero */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(5, 22, 77, 0) 60%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        {/* Lottie Animation Container - Constrained so it never overflows */}
        <div style={{ 
          width: '100%', 
          maxWidth: '800px', 
          maxHeight: '60vh', /* Prevents it from stretching too tall on large screens */
          aspectRatio: '16/9', /* Gives it a nice wide aspect ratio fit */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {mounted && (
            <DotLottieReact
              src="/under-construction.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
