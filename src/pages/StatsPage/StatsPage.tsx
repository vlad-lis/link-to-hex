import { ReactElement } from 'react';
import Header from '../../components/Header/Header';
import StatsTable from '../../components/StatsTable/StatsTable';
import styles from './StatsPage.module.scss';

const StatsPage = (): ReactElement => {
  return (
    <>
      <Header />
      <main className={styles.statspage}>
        <h3 className={styles.statspage__title}>Browse your statistics</h3>
        <StatsTable />
      </main>
    </>
  );
};

export default StatsPage;
