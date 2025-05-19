import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface ConfettiButtonProps {
  setCursorVariant?: (variant: string) => void;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({ setCursorVariant }) => {
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const triggerConfetti = () => {
    setIsAnimating(true);
    
    // Duration for the button animation
    setTimeout(() => setIsAnimating(false), 1000);
    
    // Create multiple confetti bursts
    const end = Date.now() + 1000;
    
    // Fire confetti from random positions
    const colors = ['#5D5FEF', '#F4CA40', '#FF7A50'];
    
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
    
    // Multiple small bursts
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      
      confetti({
        particleCount: 50,
        angle: Math.random() * 60 + 60,
        spread: 80,
        origin: { 
          x: Math.random(), 
          y: Math.random() - 0.2 
        },
        colors: colors,
        startVelocity: 30,
        gravity: 1,
      });
      
      confetti({
        particleCount: 50,
        angle: Math.random() * 60 + 240,
        spread: 80,
        origin: { 
          x: Math.random(), 
          y: Math.random() - 0.2 
        },
        colors: colors,
        startVelocity: 30,
        gravity: 1,
      });
      
    }, 250);
  };
  
  return (
    <motion.button
      className="fixed z-50 bottom-20 right-6 bg-gradient-to-r from-primary via-secondary to-accent text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      onClick={triggerConfetti}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? { 
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0],
        transition: { duration: 0.5 }
      } : {}}
      onMouseEnter={() => setCursorVariant && setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
    >
      <span>🎉</span>
      <span className="hidden sm:inline">{t('confetti.celebrate')}</span>
    </motion.button>
  );
};

export default ConfettiButton; 