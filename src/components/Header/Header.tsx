import { ReactElement } from 'react';
import styles from './Header.module.scss';
import HeaderNav from '../HeaderNav/HeaderNav';

const Header = (): ReactElement => {
  return (
    <header className={styles.header}>
      <div className={styles['header__logo-wrapper']}>
        <img
          src='images/logo.svg'
          alt='link hexer'
          className={styles.header__logo}
        />
        <p className={styles['header__logo-title']}>Link Hexer</p>
      </div>
      <HeaderNav />
    </header>
  );
};

export default Header;
