import { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StatsFilterForm.module.scss';
import { updateFilters } from '../../store/filtersSlice';
import { RootState } from '../../store/store';
import { lastSelectedOption } from '../../utils/helpers';

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
  const dispath = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const { register, handleSubmit } = useForm<TFormInput>();

  const handleFormSubmit: SubmitHandler<TFormInput> = async (data) => {
    const formDataArray: string[] = Object.values(data).filter(
      (value) => value !== 'none'
    );
    dispath(updateFilters(formDataArray));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='original-link'>Original:</label>
        <select
          className={styles.form__select}
          {...register('original')}
          id='original-link'
          defaultValue={lastSelectedOption(filters, 'target')}
        >
          <option value='none'>None</option>
          <option value='desc_target'>Descending</option>
          <option value='asc_target'>Ascending</option>
        </select>
      </div>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='hexed-link'>Hexed:</label>
        <select
          className={styles.form__select}
          {...register('hex')}
          id='hexed-link'
          defaultValue={lastSelectedOption(filters, 'short')}
        >
          <option value='none'>None</option>
          <option value='desc_short'>Descending</option>
          <option value='asc_short'>Ascending</option>
        </select>
      </div>
      <div className={styles['form__option-wrapper']}>
        <label htmlFor='redirects'>Redirects:</label>
        <select
          className={styles.form__select}
          {...register('redirects')}
          id='redirects'
          defaultValue={lastSelectedOption(filters, 'counter')}
        >
          <option value='none'>None</option>
          <option value='desc_counter'>High to low</option>
          <option value='asc_counter'>Low to High</option>
        </select>
      </div>
      <button className={styles.form__btn} type='submit'>
        Apply
      </button>
    </form>
  );
};

export default StatsFilterForm;
