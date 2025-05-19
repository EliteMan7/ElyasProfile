import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  setCursorVariant: (variant: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setCursorVariant }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  
  const navItems = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Variants for animations
  const headerVariants = {
    top: { 
      backgroundColor: 'rgba(252, 252, 255, 0)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      height: '5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0)'
    },
    scrolled: { 
      backgroundColor: 'rgba(252, 252, 255, 0.8)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      height: '4rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md py-0 px-6 md:px-12 transition-all duration-300"
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={headerVariants}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <Link href="/" className={`gradient-text ${language === 'ar' ? 'rtl-name' : ''}`}>
              {language === 'ar' ? (
                <>
                  <span className="text-primary">.</span>
                  <span className="arabic-name">{t('hero.name')}</span>
                </>
              ) : (
                <>
                  <span>{t('hero.name')}</span>
                  <span className="text-primary">.</span>
                </>
              )}
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center">
            <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <nav className={`flex ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`nav-link text-lg py-2 ${language === 'ar' ? 'ml-8' : 'mr-8'}`}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 150
                    }}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
              
              <div className={`${language === 'ar' ? 'mr-8' : 'ml-8'}`}>
                <LanguageToggle setCursorVariant={setCursorVariant} />
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden relative z-50 p-2 rounded-full bg-white/10 backdrop-blur-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <motion.span 
                className="block h-0.5 bg-text rounded-full" 
                animate={{ 
                  width: mobileMenuOpen ? '24px' : '16px',
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 8 : 0
                }}
                style={{ transformOrigin: 'center' }}
              />
              <motion.span 
                className="block h-0.5 w-6 bg-text rounded-full" 
                animate={{ 
                  opacity: mobileMenuOpen ? 0 : 1,
                  x: mobileMenuOpen ? 20 : 0
                }}
              />
              <motion.span 
                className="block h-0.5 bg-text rounded-full" 
                animate={{ 
                  width: mobileMenuOpen ? '24px' : '20px',
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? -8 : 0
                }}
                style={{ transformOrigin: 'center' }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden flex flex-col justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex flex-col ${language === 'ar' ? 'items-end px-8' : 'items-center'} space-y-6 py-8`}>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-medium hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div 
                className={`mt-8 flex ${language === 'ar' ? 'justify-end space-x-reverse space-x-6' : 'space-x-6'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/70 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6 footer-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/-elyasahmed" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text/70 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6 footer-social" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </motion.div>
              
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={`${language === 'ar' ? 'self-end pr-8' : 'self-center'}`}>
                  <LanguageToggle setCursorVariant={setCursorVariant} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 