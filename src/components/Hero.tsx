import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Hero = () => {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / maxScroll) * 100;
        scrollIndicatorRef.current.style.transform = `translateY(${scrollProgress}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight glitch-text mix-blend-difference"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            You ask &apos; We deliver.
            <br />
            <span className="text-electric-blue">If you can think it, We can build it.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-mono text-gray-400 mt-6 mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
           Imperfectly Overskilled.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div 
          ref={scrollIndicatorRef}
          className="w-2 h-2 rounded-full bg-electric-blue glitch-dot"
        />
      </div>
    </section>
  );
};

export default Hero; 