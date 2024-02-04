import { ReactElement } from 'react';
import Header from '../../components/Header/Header';
import styles from './SqueezePage.module.scss';
import Squeezer from '../../components/Squeezer/Squeezer';

const SqueezePage = (): ReactElement => {
  return (
    <>
      <Header />
      <main className={styles.squeeze}>
        <h1 className={styles.squeeze__greeting}>Squeeze your link here</h1>
        <Squeezer />
      </main>
    </>
  );
};

export default SqueezePage;
