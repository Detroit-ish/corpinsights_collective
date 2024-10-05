/* eslint-disable react/react-in-jsx-scope */
// src/components/Footer/Footer.tsx

import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Side */}
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>CorpInsights Collective</div>
          <div className={styles.footerTagline}>
            @quot;Making impressions before they were even a metric.
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.footerRight}>
          <nav className={styles.footerNav}>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
            <Link href="/terms-of-service">
              <a>Terms of Service</a>
            </Link>
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </nav>
          <div className={styles.footerSocial}>
            {/* Social Media Links (use appropriate icons or text) */}
            <a href="https://www.linkedin.com/company/corpinsights-collective" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://twitter.com/corpinsights" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerCopyright}>
          &copy; {new Date().getFullYear()} CorpInsights Collective. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
