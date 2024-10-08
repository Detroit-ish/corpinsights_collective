// components/HeroSection/HeroSection.tsx

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { gtmStage } from './gtmStages';

const InteractiveHoneycomb = dynamic(() => import('./InteractiveHoneycomb.client'), {
  ssr: false,
  loading: () => <div>Loading interactive elements...</div>,
});

const HeroSection: React.FC = () => {
  const [allActive, setAllActive] = useState(false);

  const handleAllStagesActive = useCallback(() => {
    setAllActive(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100 p-8 overflow-hidden">
      <AnimatePresence mode="wait">
        {!allActive ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <div className="mb-8">
              <h1 className="font-serif text-5xl text-secondary mb-4 relative">
                Master Your Go-To-Market Strategy
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent"></span>
              </h1>
              <p className="font-sans text-xl text-gray-700 max-w-xl mx-auto">
                Navigate market complexities with our AI-driven insights and expert guidance.
              </p>
            </div>

            <InteractiveHoneycomb
              stages={gtmStage}
              onAllStagesActive={handleAllStagesActive}
            />

            <button className="mt-8 px-6 py-3 font-bold uppercase bg-accent text-white rounded-full hover:bg-accent-dark transition transform hover:-translate-y-1 shadow-lg">
              Get Started
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="finalBanner"
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl text-secondary mb-4">
              Your GTM Campaign is Ready to Launch!
            </h2>
            <p className="font-sans text-lg text-gray-700 max-w-xl mx-auto mb-8">
              Take the next step towards success with our tailored strategies.
            </p>
            <button className="mt-4 px-6 py-3 font-bold uppercase bg-accent text-white rounded-full hover:bg-accent-dark transition transform hover:-translate-y-1 shadow-lg">
              Launch Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-5 w-52 h-52 rounded-full border-2 border-primary opacity-10 animate-float"></div>
        <div className="absolute bottom-16 right-8 w-40 h-40 border-2 border-accent transform rotate-45 opacity-10 animate-float-slow"></div>
      </div>
    </section>
  );
};

export default HeroSection;
