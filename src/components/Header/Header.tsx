import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import HeaderNav from '../HeaderNav/HeaderNav';

const Header = (): ReactElement => {
  const navigate = useNavigate();

  const handleLogoClick = (): void => {
    navigate('/squeeze');
  };

  return (
    <header className={styles.header}>
      <div
        className={styles['header__logo-wrapper']}
        onClick={handleLogoClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleLogoClick();
          }
        }}
        tabIndex={0}
        role='button'
      >
        <div className={styles.header__logo} />
        <p className={styles['header__logo-title']}>Link Hexer</p>
      </div>
      <HeaderNav />
    </header>
  );
};

export default Header;
