import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

interface VirtualBusinessCardProps {
  setCursorVariant: (variant: string) => void;
}

const VirtualBusinessCard: React.FC<VirtualBusinessCardProps> = ({ setCursorVariant }) => {
  const { t } = useLanguage();
  const [showCard, setShowCard] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTapped, setIsTapped] = useState(false);
  const [hoverSpot, setHoverSpot] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  // Generate QR code URL only once
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://elyas-ahmed.com/vcard/elyas_ahmed.vcf";
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation (more pronounced)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15;
    
    // Calculate hover spot for shine effect
    const hoverX = (e.clientX - rect.left) / rect.width;
    const hoverY = (e.clientY - rect.top) / rect.height;
    
    setHoverSpot({ x: hoverX, y: hoverY });
    setRotation({ x: rotateX, y: rotateY });
    setIsInteracting(true);
  };
  
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setCursorVariant('default');
    setIsInteracting(false);
    
    // Smoothly reset hover spot
    setTimeout(() => {
      setHoverSpot({ x: 0.5, y: 0.5 });
    }, 50);
  };
  
  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300);
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Reset card when hide/show
  useEffect(() => {
    if (!showCard) {
      setIsFlipped(false);
      setRotation({ x: 0, y: 0 });
      setHoverSpot({ x: 0.5, y: 0.5 });
    } else {
      // Set initial hover spot to center
      setHoverSpot({ x: 0.5, y: 0.5 });
    }
  }, [showCard]);
  
  // Sparkle animation for the shine effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (showCard && !isInteracting) {
      intervalId = setInterval(() => {
        setHoverSpot({
          x: 0.5 + (Math.random() * 0.3 - 0.15),
          y: 0.5 + (Math.random() * 0.3 - 0.15)
        });
      }, 3000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showCard, isInteracting]);
  
  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setShowCard(!showCard)}
          className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <span>{t('contact.vcard.toggle')}</span>
        </button>
        
        {showCard && (
          <div 
            className="mt-6 flex flex-col items-center justify-center" 
            style={{ perspective: "1200px" }}
          >
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, rotateY: 0 }}
              animate={{ 
                opacity: 1, 
                rotateX: rotation.x,
                rotateY: isFlipped ? 180 : rotation.y,
                scale: isTapped ? 0.95 : 1
              }}
              transition={{ 
                type: "spring", 
                damping: 15,
                stiffness: 300
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                handleTap();
                handleFlip();
              }}
              onTap={handleTap}
              className="relative w-full max-w-[350px] h-[200px] cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => setCursorVariant('button')}
            >
              {/* Front of card */}
              <div 
                className={`absolute w-full h-full rounded-xl p-6 flex flex-col justify-between
                           ${isFlipped ? 'backface-hidden' : 'z-10'}`}
                style={{
                  background: "linear-gradient(135deg, #2c3e50 0%, #1a2530 100%)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 3px 10px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backfaceVisibility: "hidden",
                  transition: "box-shadow 0.3s ease"
                }}
              >
                {/* Holographic effect */}
                <div 
                  className="absolute inset-0 rounded-xl overflow-hidden opacity-40" 
                  style={{
                    background: `
                      radial-gradient(
                        circle at ${hoverSpot.x * 100}% ${hoverSpot.y * 100}%, 
                        rgba(120, 200, 255, 0.8) 0%, 
                        rgba(255, 140, 255, 0.4) 25%, 
                        transparent 70%
                      )
                    `,
                    mixBlendMode: "color-dodge",
                    filter: "contrast(1.5) brightness(1.2)"
                  }}
                />
                
                {/* Metallic texture overlay */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-10"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
                    backgroundSize: "cover"
                  }}
                />
                
                {/* Card shine effect - more dynamic based on mouse position */}
                <div 
                  className="absolute inset-0 rounded-xl overflow-hidden opacity-70" 
                  style={{
                    background: `linear-gradient(
                      ${45 + rotation.y * 2}deg, 
                      transparent, 
                      rgba(255, 255, 255, 0.6) ${40 + rotation.x}%, 
                      transparent ${60 + rotation.x}%
                    )`,
                    filter: "contrast(1.2) brightness(1.2)"
                  }}
                />
                
                {/* Embossed logo area */}
                <div className="relative flex items-start justify-between z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white">Elyas Ahmed</h3>
                    <p className="text-gray-300 text-sm">Product Manager</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-primary flex items-center justify-center">
                    <span className="text-white font-bold text-xl relative" 
                          style={{ 
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          }}>
                      EA
                    </span>
                  </div>
                </div>
                
                {/* Contact details with subtle glass effect */}
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-200">elyasesaahmed@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-200">elyas-ahmed.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-200">Berkeley, California</span>
                  </div>
                </div>
                
                {/* Footer area */}
                <div className="mt-auto relative">
                  {/* Embossed decorative line */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-2"></div>
                  
                  <div className="absolute bottom-0 right-3 text-xs text-gray-400 opacity-70">
                    {t('contact.vcard.tap_to_flip')}
                  </div>
                </div>
              </div>
              
              {/* Back of card */}
              <div 
                className={`absolute w-full h-full rounded-xl p-6 flex flex-col
                           ${isFlipped ? 'z-10' : 'backface-hidden'}`}
                style={{
                  background: "linear-gradient(135deg, #2c3e50 0%, #1a2530 100%)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 3px 10px rgba(0, 0, 0, 0.1)",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Holographic effect */}
                <div 
                  className="absolute inset-0 rounded-xl overflow-hidden opacity-40" 
                  style={{
                    background: `
                      radial-gradient(
                        circle at ${hoverSpot.x * 100}% ${hoverSpot.y * 100}%, 
                        rgba(120, 200, 255, 0.8) 0%, 
                        rgba(255, 140, 255, 0.4) 25%, 
                        transparent 70%
                      )
                    `,
                    mixBlendMode: "color-dodge",
                    filter: "contrast(1.5) brightness(1.2)"
                  }}
                />
                
                {/* Metallic texture overlay */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-10"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
                    backgroundSize: "cover"
                  }}
                />
                
                {/* Card shine effect - more dynamic based on mouse position */}
                <div 
                  className="absolute inset-0 rounded-xl overflow-hidden opacity-70" 
                  style={{
                    background: `linear-gradient(
                      ${45 + rotation.y * 2}deg, 
                      transparent, 
                      rgba(255, 255, 255, 0.6) ${40 + rotation.x}%, 
                      transparent ${60 + rotation.x}%
                    )`,
                    filter: "contrast(1.2) brightness(1.2)"
                  }}
                />
                
                {/* Main content divided into three sections */}
                <div className="flex flex-col h-full z-10">
                  {/* 1. Title section */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-center text-white">
                      {t('contact.vcard.scan_title')}
                    </h3>
                  </div>
                  
                  {/* 2. QR Code section - flex-grow to take available space */}
                  <div className="flex-grow flex items-center justify-center mb-4">
                    {/* Glowing QR code frame */}
                    <div className="relative">
                      <div className="absolute -inset-1.5 bg-gradient-to-br from-primary/30 to-blue-500/20 rounded-lg blur-md"></div>
                      <div className="bg-white p-2 rounded-lg shadow-inner relative">
                        <img
                          src={qrCodeUrl}
                          alt="QR Code for Elyas Ahmed's contact information"
                          width={100}
                          height={100}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 3. Footer section */}
                  <div className="mt-auto">
                    {/* Embossed decorative line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-3"></div>
                    
                    {/* Download button */}
                    <div className="flex justify-center mb-2">
                      <a
                        href="/vcard/elyas_ahmed.vcf"
                        download="Elyas_Ahmed.vcf"
                        className="inline-flex items-center space-x-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{t('contact.vcard.download')}</span>
                      </a>
                    </div>
                    
                    {/* Tap to flip text in same position as front */}
                    <div className="absolute bottom-0 right-3 text-xs text-gray-400 opacity-70">
                      {t('contact.vcard.tap_to_flip')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VirtualBusinessCard; 