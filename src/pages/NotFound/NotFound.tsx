import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.notfound}>
      <div className={styles.notfound__logo} />
      <p className={styles.notfound__title}>Uncharted territory</p>
      <p className={styles.notfound__subtitle}>
        This page does not exist :&#40;
      </p>
      <button
        className={styles.notfound__btn}
        type='button'
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
};

export default NotFound;
