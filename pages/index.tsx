import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollIndicator from '../components/ScrollIndicator';
import ConfettiButton from '../components/ConfettiButton';
import FortuneCookie from '../components/FortuneCookie';

interface HomeProps {
  setCursorVariant: (variant: string) => void;
}

export default function Home({ setCursorVariant }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Set document title with a blinking effect to attract attention
  useEffect(() => {
    let title = "Welcome to My World ✨";
    let defaultTitle = "Elyas Ahmed | Portfolio";
    let intervalId: NodeJS.Timeout;
    
    intervalId = setInterval(() => {
      document.title = document.title === defaultTitle ? title : defaultTitle;
    }, 2000);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, []);
  
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>Elyas Ahmed | Portfolio</title>
        <meta name="description" content="Product Manager with a technical background, passionate about building products that solve real-world problems." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <ScrollIndicator />
      <ConfettiButton setCursorVariant={setCursorVariant} />
      
      <AnimatePresence>
        {isLoading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-background z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                repeatType: "loop"
              }}
              className="w-16 h-16 border-4 border-t-primary border-r-secondary border-b-accent border-l-text rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background magical-bg"
          >
            <Header setCursorVariant={setCursorVariant} />
            
            <main className="relative">
              <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/3 h-screen bg-primary/5 -rotate-12 transform-gpu"></div>
                <div className="absolute top-1/3 right-0 w-1/4 h-screen bg-secondary/5 rotate-12 transform-gpu"></div>
                <div className="absolute bottom-0 left-1/4 w-1/3 h-screen bg-accent/5 -rotate-6 transform-gpu"></div>
              </div>
              
              <div className="relative z-10">
                <Hero setCursorVariant={setCursorVariant} />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  id="about"
                  className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/30"
                >
                  <About setCursorVariant={setCursorVariant} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  id="projects"
                  className="py-20 px-4 sm:px-6 lg:px-8"
                >
                  <Projects setCursorVariant={setCursorVariant} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  id="contact"
                  className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/30"
                >
                  <Contact setCursorVariant={setCursorVariant} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="py-10"
                >
                  <FortuneCookie setCursorVariant={setCursorVariant} />
                </motion.div>
              </div>
            </main>
            
            <Footer setCursorVariant={setCursorVariant} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 