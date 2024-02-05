import { ReactElement } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './HeaderNav.module.scss';
import { RootState } from '../../store/store';
import { setIsLoggedIn } from '../../store/authSlice';
import { clearSqueezedLinks } from '../../store/squeezedLinksSlice';

const HeaderNav = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? `${styles.nav__link} ${styles.nav__link_active}`
      : `${styles.nav__link}`;

  const handleLogout = (): void => {
    sessionStorage.removeItem('token');
    dispatch(setIsLoggedIn(false));
    dispatch(clearSqueezedLinks());
    navigate('/signin', { replace: true });
  };

  if (isLoggedIn) {
    return (
      <nav className={styles.nav}>
        <NavLink className={linkClass} to='/squeeze'>
          Squeeze Link
        </NavLink>
        <NavLink className={linkClass} to='/'>
          Statistics
        </NavLink>
        <button
          className={styles.nav__logout}
          type='button'
          onClick={handleLogout}
        >
          Log out
        </button>
      </nav>
    );
  }

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
