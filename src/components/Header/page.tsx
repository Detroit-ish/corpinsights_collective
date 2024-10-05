/* eslint-disable react/react-in-jsx-scope */
// src/components/Header/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <h1>CorpInsights</h1>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
      <div className={styles.valueProposition}>
        <h2>Leading the Future: Empowering Businesses with Sustainable, Data-Driven Strategies</h2>
      </div>
    </header>
  );
}
