import React from 'react';
import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import ParticleBackground from './ParticleBackground';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  setCursorVariant: (variant: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCursorVariant }) => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Particle background */}
      <ParticleBackground quantity={40} color="#5D5FEF" />
      
      {/* Animated background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-96 -right-24 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-8 h-8 bg-primary/80 rounded-full"></div>
      <div className="absolute bottom-1/3 right-20 w-12 h-12 bg-secondary/80 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-accent/80 rounded-full"></div>
      
      {/* Animated dots grid - desktop only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-text rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full"
            >
              <p className="text-primary font-medium">{t('hero.subtitle')}</p>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {t('hero.title')}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  className={`block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${language === 'ar' ? 'arabic-name' : ''}`}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  {t('hero.name')}
                </motion.span>
              </span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            ></motion.div>
            
            <motion.p 
              className="text-lg md:text-xl max-w-lg text-text/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <a
                href="#projects"
                className="btn-primary shadow-lg shadow-primary/20 flex items-center gap-2"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span>{t('hero.cta.projects')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#contact"
                className="btn-outline shadow-lg"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {t('hero.cta.contact')}
              </a>
            </motion.div>
            
            {/* Social icons */}
            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg className="w-5 h-5 footer-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/-elyasahmed" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg className="w-5 h-5 footer-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#contact" 
                className="text-text/70 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg className="w-5 h-5 footer-social" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements behind weather card */}
              <div className="absolute -z-10 inset-0 blur-md opacity-50">
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/30 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-secondary/30 rounded-full"></div>
              </div>
              <WeatherCard setCursorVariant={setCursorVariant} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 