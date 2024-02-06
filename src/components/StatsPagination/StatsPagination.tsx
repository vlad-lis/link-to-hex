import { ReactElement } from 'react';
import styles from './StatsPagination.module.scss';

type TStatsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const StatsPagination = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: TStatsPaginationProps): ReactElement => {
  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pagination__btn} ${styles.pagination__btn_prev}`}
        type='button'
        onClick={onPrevPage}
        disabled={currentPage === 0}
        aria-label='prev-page'
      />
      <p className={styles.pagination__page}>{currentPage + 1}</p>
      <button
        className={`${styles.pagination__btn} ${styles.pagination__btn_next}`}
        type='button'
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
        aria-label='next-page'
      />
    </div>
  );
};

export default StatsPagination;
