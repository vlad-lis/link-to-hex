import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderNav.module.scss';

const HeaderNav = (): ReactElement => {
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? `${styles.nav__link} ${styles.nav__link_active}`
      : `${styles.nav__link}`;

  return (
    <nav className={styles.nav}>
      <NavLink className={linkClass} to='/signup'>
        Sign up
      </NavLink>
      <NavLink className={linkClass} to='/signin'>
        Sign in
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
