import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import styles from './AuthForm.module.scss';

type TFormData = {
  username: string;
  password: string;
};

const AuthForm = (): ReactElement => {
  const [formData, setFormData] = useState<TFormData>({
    username: '',
    password: '',
  });
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const passwordBtnClass = `${styles['form__password-btn']}
    ${isPasswordShown ? styles['form__password-btn_hide'] : ''}`;

  // save inputs to form state
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { username, password } = formData;

    console.log(username, password);
  };

  // toggle password visiblity
  const handleShowPassword = (): void => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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

      <button className={styles['form__submit-btn']} type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
