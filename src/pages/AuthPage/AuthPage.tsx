import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './AuthPage.module.scss';

const AuthPage = (): ReactElement => {
  return (
    <div>
      <Header />
      <main className={styles.auth}>
        <h3 className={styles.auth__greeting}>Register to continue</h3>
        <AuthForm />
        <div className={styles.auth__redirect}>
          <p className={styles['auth__redirect-text']}>Already registered?</p>
          <NavLink to='/' className={styles['auth__redirect-link']}>
            Sign in
          </NavLink>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
