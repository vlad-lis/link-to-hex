import { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './StatsFilterForm.module.scss';

enum FilterEnum {
  desc = 'desc',
  asc = 'asc',
  none = 'none',
}

type TFormInput = {
  redirects: FilterEnum;
  original: FilterEnum;
  hex: FilterEnum;
};

const StatsFilterForm = (): ReactElement => {
  const { register, handleSubmit } = useForm<TFormInput>();
  const onSubmit: SubmitHandler<TFormInput> = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='redirects'>Redirects:</label>
        <select
          className={styles.form__select}
          {...register('redirects')}
          id='redirects'
        >
          <option value='none'>None</option>
          <option value='desc'>High to low</option>
          <option value='asc'>Low to High</option>
        </select>
      </div>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='original-link'>Original:</label>
        <select
          className={styles.form__select}
          {...register('original')}
          id='original-link'
        >
          <option value='none'>None</option>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </div>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='hexed-link'>Hexed:</label>
        <select
          className={styles.form__select}
          {...register('hex')}
          id='hexed-link'
        >
          <option value='none'>None</option>
          <option value='desc'>Descending</option>
          <option value='asc'>Ascending</option>
        </select>
      </div>
      <button className={styles.form__btn} type='submit'>
        Apply
      </button>
    </form>
  );
};

export default StatsFilterForm;
