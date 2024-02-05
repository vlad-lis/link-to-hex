import { ReactElement, useEffect, useState } from 'react';
import { TStatsObject, getStats } from '../../utils/mainApi';
import Loader from '../Loader/Loader';
import styles from './StatsTable.module.scss';
import copyToClipboard from '../../utils/helpers';

const StatsTable = (): ReactElement => {
  const [apiData, setApiData] = useState<TStatsObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [linksTotal, setLinksTotal] = useState<number | undefined>(0);

  useEffect(() => {
    const getApiStats = async (): Promise<void> => {
      try {
        const result = await getStats();

        if (result.success && result.data) {
          setApiData(result.data);
          setLinksTotal(result.total);
        } else if (result.statusCode) {
          console.log(`Error ${result.statusCode}`);
        } else {
          console.log('Unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getApiStats();
  }, []);

  // handle copy original
  const handleCopyOriginal = async (link: string): Promise<void> => {
    await copyToClipboard(link);
  };

  // handle copy hexed
  const handleCopyHexed = async (link: string): Promise<void> => {
    await copyToClipboard(`https://front-test.hex.team/s/${link}`);
  };

  return (
    <section className={styles.stats}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className={styles.stats__title}>Links created: {linksTotal}</h3>
          <div className={styles['stats__controls-wrapper']}>
            <p className={styles.stats__tip}>(click a cell to copy a link)</p>
            <div className={styles.stats__controls}>
              <button
                className={`${styles.stats__btn} ${styles.stats__btn_filter}`}
                type='button'
                aria-label='filters'
              />
              <button
                className={`${styles.stats__btn} ${styles.stats__btn_refresh}`}
                type='button'
                aria-label='refresh'
              />
            </div>
          </div>
          <table className={styles.stats__table}>
            <thead>
              <tr>
                <th aria-hidden='true'>&nbsp;</th>
                <th className={styles['stats__header-row']}>Original link</th>
                <th
                  className={`${styles['stats__header-row']} ${styles['stats__header-row_centered']}`}
                >
                  Hexed link
                </th>
                <th
                  className={`${styles['stats__header-row']} ${styles['stats__header-row_centered']}`}
                >
                  Redirects
                </th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((obj, index) => {
                return (
                  <tr className={styles.stats__row} key={obj.id}>
                    <td
                      className={`${styles.stats__cell} ${styles.stats__cell_centered}`}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={`${styles.stats__cell} ${styles.stats__cell_original}`}
                      onClick={() => handleCopyOriginal(obj.target)}
                    >
                      {obj.target}
                    </td>
                    <td
                      className={`${styles.stats__cell} ${styles.stats__cell_centered} ${styles.stats__cell_hex}`}
                      onClick={() => handleCopyHexed(obj.short)}
                    >
                      {obj.short}
                    </td>
                    <td
                      className={`${styles.stats__cell} ${styles.stats__cell_centered}`}
                    >
                      {obj.counter}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};

export default StatsTable;
