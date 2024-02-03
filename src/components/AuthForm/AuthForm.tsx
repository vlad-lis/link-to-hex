import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import styles from './AuthForm.module.scss';
import { signUp, signIn } from '../../utils/authApi';

type TAuthForm = {
  isSignUpPage: boolean;
};

type TFormData = {
  username: string;
  password: string;
};

const AuthForm = ({ isSignUpPage }: TAuthForm): ReactElement => {
  const [formData, setFormData] = useState<TFormData>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const passwordBtnClass = `${styles['form__password-btn']}
    ${isPasswordShown ? styles['form__password-btn_hide'] : ''}`;

  // clear form on route change
  useEffect(() => {
    setFormData({ username: '', password: '' });
    setErrorMessage('');
  }, [isSignUpPage]);

  // save inputs to form state
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit signup form
  const handleSignUpSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { username, password } = formData;

    const result = await signUp(username, password);

    if (result.success) {
      console.log(result);
    } else if (result.statusCode === 400) {
      setErrorMessage('User already exists');
    } else if (result.statusCode) {
      setErrorMessage(`Error ${result.statusCode}`);
    } else {
      setErrorMessage('Uknown error');
    }
  };

  // submit signin form
  const handleSignInSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { username, password } = formData;

    const result = await signIn(username, password);

    if (result.success) {
      console.log(result);
    } else if (result.statusCode === 400) {
      setErrorMessage('User already exists');
    } else if (result.statusCode) {
      setErrorMessage(`Error ${result.statusCode}`);
    } else {
      setErrorMessage('Uknown error');
    }
  };

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
      <button className={styles['form__submit-btn']} type='submit'>
        {isSignUpPage ? 'Register' : 'Log in'}
      </button>
    </form>
  );
};

export default AuthForm;
