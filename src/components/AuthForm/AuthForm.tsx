import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './AuthForm.module.scss';
import { signUp, signIn, TAuthResult } from '../../utils/authApi';
import { setIsLoggedIn } from '../../store/authSlice';

type TAuthFormProps = {
  isSignUpPage: boolean;
};

type TFormData = {
  username: string;
  password: string;
};

const AuthForm = ({ isSignUpPage }: TAuthFormProps): ReactElement => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<TFormData>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const passwordBtnClass = `${styles['form__password-btn']}
    ${isPasswordShown ? styles['form__password-btn_hide'] : ''}`;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const submitBtnClass = `${styles['form__submit-btn']}
    ${isSubmitDisabled ? styles['form__submit-btn_disabled'] : ''}`;
  const navigate = useNavigate();

  // clear form on route change
  useEffect(() => {
    setFormData({ username: '', password: '' });
    setErrorMessage('');
  }, [isSignUpPage]);

  // update submit button state on input
  useEffect(() => {
    setIsSubmitDisabled(
      !(formData.username.length > 0 && formData.password.length > 0)
    );
  }, [formData]);

  // save inputs to form state
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  // submit form general func
  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
    action: (username: string, password: string) => Promise<TAuthResult>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    const { username, password } = formData;

    const result = await action(username, password);

    if (result.success) {
      if (action === signIn && result.token) {
        sessionStorage.setItem('token', result.token);
        dispatch(setIsLoggedIn(true));
        navigate('/squeeze', { replace: true });
      } else if (action === signUp) {
        // sign in after successful registration
        const signInRes = await signIn(username, password);
        if (signInRes.success && signInRes.token) {
          sessionStorage.setItem('token', signInRes.token);
          dispatch(setIsLoggedIn(true));
          navigate('/squeeze', { replace: true });
        }
      }
      // handle errors
    } else if (result.statusCode === 400) {
      setErrorMessage(
        action === signIn ? 'Incorrect password' : 'User already exists'
      );
    } else if (result.statusCode) {
      setErrorMessage(`Error ${result.statusCode}`);
    } else {
      setErrorMessage('Unknown error');
    }

    setIsSubmitDisabled(false);
  };

  // submit signup form
  const handleSignUpSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => handleFormSubmit(e, signUp);

  // submit signin form
  const handleSignInSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => handleFormSubmit(e, signIn);

  // toggle password visiblity
  const handleShowPassword = (): void => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form
      className={styles.form}
      onSubmit={isSignUpPage ? handleSignUpSubmit : handleSignInSubmit}
    >
      <fieldset className={styles.form__fieldset}>
        <label htmlFor='username'>Name</label>
        <input
          className={styles.form__input}
          name='username'
          id='username'
          placeholder='Enter name'
          value={formData.username || ''}
          required
          onChange={handleChange}
        />
      </fieldset>

      <fieldset className={styles.form__fieldset}>
        <label htmlFor='password'>Password</label>
        <div className={styles['form__password-wrapper']}>
          <input
            className={styles.form__input}
            name='password'
            id='password'
            type={isPasswordShown ? 'text' : 'password'}
            placeholder='Enter password'
            value={formData.password || ''}
            required
            onChange={handleChange}
          />
          <button
            className={passwordBtnClass}
            type='button'
            onClick={handleShowPassword}
            aria-label='toggle-password-visibility'
          />
        </div>
      </fieldset>

      <p className={styles.form__error}>{errorMessage}</p>
      <button
        className={submitBtnClass}
        type='submit'
        disabled={isSubmitDisabled}
      >
        {isSignUpPage ? 'Register' : 'Log in'}
      </button>
    </form>
  );
};

export default AuthForm;
