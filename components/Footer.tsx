import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setCursorVariant: (variant: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCursorVariant }) => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-text text-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <motion.div 
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {language === 'ar' ? (
                <span className="rtl-name">
                  <span className="text-accent">.</span>
                  Elyas Ahmed
                </span>
              ) : (
                <span>
                  Elyas Ahmed<span className="text-accent">.</span>
                </span>
              )}
            </motion.div>
            <p className="text-background/80 mb-6">
              {t('footer.description')}
            </p>
            <h3 className="text-lg font-semibold mb-3">{t('footer.social')}</h3>
            <div className="flex space-x-4 rtl:space-x-0 rtl:space-x-reverse rtl:gap-4">
              <motion.a 
                href="https://linkedin.com/in/-elyasahmed" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary transition-colors"
                whileHover={{ y: -3 }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 footer-social" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://github.com/elyasahmed" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background hover:bg-primary transition-colors"
                whileHover={{ y: -3 }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg className="h-6 w-6 footer-social" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quicklinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#hero" 
                  className="text-background/80 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-background/80 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-background/80 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-background/80 hover:text-primary transition-colors"
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.touch')}</h3>
            <p className="text-background/80 mb-4">
              {t('footer.touch.description')}
            </p>
            <a 
              href="mailto:elyasesaahmed@gmail.com" 
              className="text-background hover:text-primary transition-colors inline-flex items-center"
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <svg className="w-5 h-5 mr-2 footer-social" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              elyasesaahmed@gmail.com
            </a>
            <div className="mt-4">
              <span className="block text-background/80 mb-1">{t('contact.location.label')}:</span>
              <span className="text-background">{t('contact.location.value')}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/10 pt-6 text-center text-background/60">
          <p className="mt-2 text-sm">
            {t('footer.graduate')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 