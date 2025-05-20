import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

interface VirtualBusinessCardProps {
  setCursorVariant: (variant: string) => void;
}

const VirtualBusinessCard: React.FC<VirtualBusinessCardProps> = ({ setCursorVariant }) => {
  const { t } = useLanguage();
  const [showCard, setShowCard] = useState(false);
  
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
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
          </svg>
          <span>{t('contact.vcard.toggle')}</span>
        </button>
        
        {showCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-5 bg-white rounded-xl shadow-lg max-w-xs"
          >
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-3 rounded-lg mb-3">
                {/* QR Code that links to the vCard file */}
                <Image
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://elyas-ahmed.com/vcard/elyas_ahmed.vcf"
                  alt="QR Code for Elyas Ahmed's contact information"
                  width={150}
                  height={150}
                  className="rounded"
                />
              </div>
              
              <h3 className="text-lg font-bold">Elyas Ahmed</h3>
              <p className="text-sm text-gray-600 mb-3">Product Manager</p>
              
              <a
                href="/vcard/elyas_ahmed.vcf"
                download="Elyas_Ahmed.vcf"
                className="btn-sm bg-primary text-white hover:bg-primary-dark transition-colors flex items-center space-x-1"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t('contact.vcard.download')}</span>
              </a>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                {t('contact.vcard.instruction')}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VirtualBusinessCard; 