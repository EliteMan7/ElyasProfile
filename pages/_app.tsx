import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '../context/LanguageContext';

interface MyAppProps extends AppProps {
  pageProps: any;
  Component: any;
}

function MyApp({ Component, pageProps, router }: MyAppProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const variants = {
    default: {
      x: cursorPosition.x - 10,
      y: cursorPosition.y - 10,
      backgroundColor: "#5D5FEF"
    },
    button: {
      x: cursorPosition.x - 25,
      y: cursorPosition.y - 25,
      height: 50,
      width: 50,
      backgroundColor: "#F4CA40"
    }
  };
  
  return (
    <LanguageProvider>
      <React.Fragment>
        <div 
          className="custom-cursor" 
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: cursorVariant === 'default' ? 'scale(1)' : 'scale(1.5)',
            backgroundColor: cursorVariant === 'default' ? '#5D5FEF' : '#F4CA40'
          }}
        />
        <div className="magical-bg min-h-screen">
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} setCursorVariant={setCursorVariant} />
          </AnimatePresence>
        </div>
      </React.Fragment>
    </LanguageProvider>
  );
}

export default MyApp; 