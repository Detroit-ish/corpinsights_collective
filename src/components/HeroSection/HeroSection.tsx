// components/HeroSection/HeroSection.tsx
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from './HeroSection.module.css';
import { gtmStage } from './gtmStages';

const InteractiveHoneycomb = dynamic(
  () => import('./InteractiveHoneycomb.client'),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading interactive elements...</div>,
  }
);

const HeroSection: React.FC = () => {
  const [allActive, setAllActive] = useState(false);

  const handleAllStagesActive = useCallback(() => {
    setAllActive(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      <AnimatePresence mode="wait">
        {!allActive ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.contentContainer}
          >
            <div className={styles.heroContent}>
              <h1 className={styles.title}>Master Your Go-To-Market Strategy</h1>
              <p className={styles.subtitle}>
                Navigate market complexities with our AI-driven insights and expert guidance.
              </p>
            </div>

            <Suspense fallback={<div className={styles.loading}>Loading interactive elements...</div>}>
  <InteractiveHoneycomb
    stages={gtmStage}
    onAllStagesActive={handleAllStagesActive}
    honeycombSize={2.5} // Adjust this value to change the size of all honeycombs
  />
</Suspense>

            <button className={styles.cta}>Get Started</button>

            <div className={styles.brandElements}>
              <div className={styles.brandCircle}></div>
              <div className={styles.brandSquare}></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="finalBanner"
            className={styles.finalBanner}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.finalTitle}>
              Your GTM Campaign is Ready to Launch!
            </h2>
            <p className={styles.finalSubtitle}>
              Take the next step towards success with our tailored strategies.
            </p>
            <button className={styles.cta}>Launch Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;