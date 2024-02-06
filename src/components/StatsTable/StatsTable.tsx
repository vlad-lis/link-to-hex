import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStatsObject, getStats } from '../../utils/mainApi';
import Loader from '../Loader/Loader';
import styles from './StatsTable.module.scss';
import { copyToClipboard } from '../../utils/helpers';
import StatsFilterForm from '../StatsFilterForm/StatsFilterForm';
import { RootState } from '../../store/store';
import { clearFilters } from '../../store/filtersSlice';
import {
  PAGINATION_OFFSET_INITIAL,
  PAGINATION_LIMIT,
} from '../../utils/constants';
import StatsPagination from '../StatsPagination/StatsPagination';

const StatsTable = (): ReactElement => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const [apiData, setApiData] = useState<TStatsObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [linksTotal, setLinksTotal] = useState<number | undefined>(0);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const statsFiltersClass = `${styles.stats__filters} ${isFilterPanelOpen ? styles.stats__filters_expanded : ''}`;
  const [paginationOffset, setPaginationOffset] = useState<number>(
    PAGINATION_OFFSET_INITIAL
  );
  const [loadingError, setLoadingError] = useState<string>('');

  // load data
  useEffect(() => {
    const getApiStats = async (
      offset: number,
      limit: number
    ): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await getStats(offset, limit, filters);

        if (result.success && result.data) {
          setApiData(result.data);
          setLinksTotal(result.total);
        } else if (result.statusCode) {
          setLoadingError(`Error fetching data: ${result.statusCode}`);
        } else {
          setLoadingError('Something went wrong');
        }
      } finally {
        setIsFilterPanelOpen(false);
        setIsLoading(false);
      }
    };

    getApiStats(paginationOffset, PAGINATION_LIMIT);
  }, [filters, paginationOffset]);

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
    dispatch(clearFilters());
    setPaginationOffset(PAGINATION_OFFSET_INITIAL);
  };

  // previous page
  const handlePrevPageClick = (): void => {
    if (paginationOffset > 0) {
      setPaginationOffset(paginationOffset - PAGINATION_LIMIT);
    }
  };

  const handleNextPageClick = (): void => {
    if (paginationOffset + PAGINATION_LIMIT < linksTotal!) {
      setPaginationOffset(paginationOffset + PAGINATION_LIMIT);
    }
  };

  return (
    <section className={styles.stats}>
      {isLoading ? (
        <Loader />
      ) : (
        (() => {
          if (apiData.length === 0 && !loadingError) {
            return (
              <p className={styles.stats__prompt}>
                Create some links first to see their stats
              </p>
            );
          }
          return (
            <>
              <h3 className={styles.stats__title}>
                Links created: {linksTotal}
              </h3>
              <div className={styles['stats__controls-wrapper']}>
                <p className={styles.stats__tip}>
                  (click a cell to copy a link)
                </p>
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
                  <StatsPagination
                    currentPage={paginationOffset / PAGINATION_LIMIT}
                    totalPages={Math.ceil(linksTotal! / PAGINATION_LIMIT)}
                    onPrevPage={handlePrevPageClick}
                    onNextPage={handleNextPageClick}
                  />
                </div>
              </div>
              <div className={statsFiltersClass}>
                <StatsFilterForm />
              </div>

              {loadingError && (
                <p className={styles.stats__error}>{loadingError}</p>
              )}

              {apiData.length > 0 && (
                <table className={styles.stats__table}>
                  <thead>
                    <tr>
                      <th aria-hidden='true'>&nbsp;</th>
                      <th className={styles['stats__header-row']}>
                        Original link
                      </th>
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
                    {apiData.map((obj, index) => (
                      <tr className={styles.stats__row} key={obj.id}>
                        <td
                          className={`${styles.stats__cell} ${styles.stats__cell_centered}`}
                        >
                          {paginationOffset + index + 1}
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
                    ))}
                  </tbody>
                </table>
              )}
            </>
          );
        })()
      )}
    </section>
  );
};

export default StatsTable;
