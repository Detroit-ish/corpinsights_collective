// src/components/Header/Header.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Header() {
  const statements = [
    'Leading the Future: Empowering Businesses with Sustainable, Data-Driven Strategies',
    'Innovate Today for a Better Tomorrow: Unlocking Potential with Insightful Analytics',
    'Driving Growth: Your Partner in Strategic Business Solutions',
  ];

  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatementIndex((prevIndex) =>
        prevIndex === statements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [statements.length]);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <h1>CorpInsights</h1>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.valueProposition}>
        <TransitionGroup>
          <CSSTransition
            key={currentStatementIndex}
            timeout={500}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
          >
            <h2>{statements[currentStatementIndex]}</h2>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </header>
  );
}
