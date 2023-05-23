import styles from './app-footer.module.css';
import logo from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';

export default function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <div>
          <Link href="/" className="relative h-14 w-14 md:h-20 md:w-20">
            <Image
              className="-ml-4 object-contain"
              src={logo}
              alt="Amae Group"
              fill
              priority
              sizes="10vw"
            />
          </Link>
          <p>Amae Group</p>
        </div>
        <div>
          <span className="footer-title">Top Up Game</span>
          <Link href="/game/mobile-legends" className="link-hover link">
            Mobile Legends
          </Link>
          <Link href="/game/pubgm" className="link-hover link">
            PUBG Mobile
          </Link>
          <Link href="/game/free-fire" className="link-hover link">
            Free Fire
          </Link>
        </div>
        <div>
          <span className="footer-title">Informasi</span>
          <a className="link-hover link">About us</a>
          <a className="link-hover link">Contact</a>
          <Link href="/news" className="link-hover link">
            Berita &amp; Promo
          </Link>
        </div>
        <div>
          <span className="footer-title">Metode Pembayaran</span>
          <a className="link-hover link">Terms of use</a>
          <a className="link-hover link">Privacy policy</a>
          <a className="link-hover link">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
}
