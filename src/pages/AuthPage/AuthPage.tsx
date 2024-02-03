import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './AuthPage.module.scss';

type TAuthPageProps = {
  isSignUpPage: boolean;
};

const AuthPage = ({ isSignUpPage }: TAuthPageProps): ReactElement => {
  return (
    <div>
      <Header />
      <main className={styles.auth}>
        <h3 className={styles.auth__greeting}>
          {isSignUpPage ? 'Register to continue' : 'Log in to continue'}
        </h3>
        <AuthForm isSignUpPage={isSignUpPage} />
        <div className={styles.auth__redirect}>
          <p className={styles['auth__redirect-text']}>
            {isSignUpPage ? 'Already registered?' : 'Not registered?'}
          </p>
          <NavLink
            to={isSignUpPage ? '/signin' : '/signup'}
            className={styles['auth__redirect-link']}
          >
            {isSignUpPage ? 'Sign in' : 'Sign up'}
          </NavLink>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
