import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TStatsObject, getStats } from '../../utils/mainApi';
import Loader from '../Loader/Loader';
import styles from './StatsTable.module.scss';
import copyToClipboard from '../../utils/helpers';
import StatsFilterForm from '../StatsFilterForm/StatsFilterForm';
import { RootState } from '../../store/store';

const StatsTable = (): ReactElement => {
  const filters = useSelector((state: RootState) => state.filters.filters);
  const [apiData, setApiData] = useState<TStatsObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [linksTotal, setLinksTotal] = useState<number | undefined>(0);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const statsFiltersClass = `${styles.stats__filters} ${isFilterPanelOpen ? styles.stats__filters_expanded : ''}`;

  // api request
  const getApiStats = useCallback(
    async (offset: string, limit: string): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await getStats(offset, limit, filters);

        if (result.success && result.data) {
          setApiData(result.data);
          setLinksTotal(result.total);
        } else if (result.statusCode) {
          console.log(`Error ${result.statusCode}`);
        } else {
          console.log('Unknown error occurred');
        }
      } finally {
        setIsFilterPanelOpen(false);
        setIsLoading(false);
      }
    },
    [filters]
  );

  // load initial data
  useEffect(() => {
    getApiStats('0', '10');
  }, [getApiStats]);

  // copy original link
  const handleCopyOriginal = async (link: string): Promise<void> => {
    await copyToClipboard(link);
  };

  // copy hexed link
  const handleCopyHexed = async (link: string): Promise<void> => {
    await copyToClipboard(`https://front-test.hex.team/s/${link}`);
  };

  // toggle filter panel
  const handleFilterPanelToggle = (): void => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // refresh click
  const handleRefreshClick = (): void => {
    getApiStats('0', '10');
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
                onClick={handleFilterPanelToggle}
              />
              <button
                className={`${styles.stats__btn} ${styles.stats__btn_refresh}`}
                type='button'
                aria-label='refresh'
                onClick={handleRefreshClick}
              />
            </div>
          </div>
          <div className={statsFiltersClass}>
            <StatsFilterForm />
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
