import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  setCursorVariant?: (variant: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ setCursorVariant }) => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="inline-flex rounded-full bg-indigo-200 p-0.5 h-10">
      <button
        className={`w-14 py-1.5 rounded-full focus:outline-none transition-colors duration-200 ${
          language === 'en' ? 'bg-indigo-500 text-white font-medium' : 'text-indigo-600 hover:bg-indigo-100'
        }`}
        onClick={() => setLanguage('en')}
        onMouseEnter={() => setCursorVariant && setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
      >
        EN
      </button>
      
      <button
        className={`w-16 py-1.5 rounded-full focus:outline-none transition-colors duration-200 ${
          language === 'ar' ? 'bg-indigo-500 text-white font-medium' : 'text-indigo-600 hover:bg-indigo-100'
        }`}
        onClick={() => setLanguage('ar')}
        onMouseEnter={() => setCursorVariant && setCursorVariant('button')}
        onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
      >
        <span className="text-sm">عربي</span>
      </button>
    </div>
  );
};

export default LanguageToggle; 