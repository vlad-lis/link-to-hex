import { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import styles from './Squeezer.module.scss';
import { squeezeLink } from '../../utils/mainApi';

type TFormData = {
  link: string;
};

const Squeezer = (): ReactElement => {
  const linkRegex: RegExp = /^(https?:\/\/)/;
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<TFormData>({
    link: '',
  });
  const submitBtnClass = `${styles.squeezer__btn}
    ${isSubmitDisabled ? styles.squeezer__btn_disabled : ''}`;
  const [squeezedLink, setSqueezedLink] = useState<string>('');
  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);
  const copyBtnClass = `${styles.squeezer__copy} ${isCopySuccess ? styles.squeezer__copy_success : ''}`;

  // save input
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
    setSqueezedLink('');
    setIsSubmitDisabled(false);
    setIsCopySuccess(false);
  };

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitDisabled(true);

    const { link } = formData;

    if (!linkRegex.test(link)) {
      setErrorMessage('Please input a valid link');
      return;
    }

    const result = await squeezeLink(link);

    if (result.success && result.short) {
      setSqueezedLink(result.short);
    } else if (result.statusCode === 400 || result.statusCode === 422) {
      setErrorMessage('Please input a valid link');
    } else if (result.statusCode) {
      setErrorMessage(`Error ${result.statusCode}`);
    } else {
      setErrorMessage('Unknown error');
    }
  };

  // copy squeezed link
  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopySuccess(true);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  const handleCopyBtnClick = (): void => {
    if (squeezedLink) {
      copyToClipboard(`https://front-test.hex.team/s/${squeezedLink}`);
    }
  };

  return (
    <form className={styles.squeezer} onSubmit={handleSubmit}>
      <fieldset className={styles.squeezer__fieldset}>
        <label className={styles.squeezer__prompt} htmlFor='link'>
          Paste your link in this field:
        </label>
        <div className={styles['squeezer__input-wrapper']}>
          <input
            className={styles.squeezer__input}
            name='link'
            id='link'
            value={formData.link || ''}
            placeholder='http(s)://...'
            required
            onChange={handleChange}
          />
          <button
            className={submitBtnClass}
            type='submit'
            disabled={isSubmitDisabled}
          >
            Squeeze!
          </button>
        </div>
      </fieldset>
      <div className={styles.squeezer__result}>
        {errorMessage && (
          <p className={styles.squeezer__error}>{errorMessage}</p>
        )}
        {squeezedLink && (
          <>
            <p className={styles.squeezer__link}>Your squeezed link is: </p>
            <div className={styles['squeezer__redirect-wrapper']}>
              <a
                className={`${styles.squeezer__link} ${styles.squeezer__link_redirect}`}
                href={`https://front-test.hex.team/s/${squeezedLink}`}
                target='_blank'
                rel='noreferrer'
              >
                https://front-test.hex.team/s/{squeezedLink}
              </a>
              <button
                className={copyBtnClass}
                type='button'
                aria-label='copy'
                onClick={handleCopyBtnClick}
              />
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default Squeezer;
