import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8 max-w-md mx-auto">
          Oops! Looks like you've ventured into an unexplored part of my digital world.
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute left-1/4 top-1/3 w-64 h-64 rounded-full bg-primary/5"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
        }}
      />
      <motion.div 
        className="absolute right-1/4 bottom-1/3 w-72 h-72 rounded-full bg-secondary/5"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          delay: 0.5,
        }}
      />
    </div>
  );
} 