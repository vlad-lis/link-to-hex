import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SqueezerSession.module.scss';
import { RootState } from '../../store/store';
import copyToClipboard from '../../utils/helpers';
import { clearSqueezedLinks } from '../../store/squeezedLinksSlice';

const SqueezerSession = (): ReactElement => {
  const dispatch = useDispatch();
  const squeezedLinks = useSelector(
    (state: RootState) => state.squeezedLinks.links
  );

  // clear session
  const handleClear = (): void => {
    dispatch(clearSqueezedLinks());
  };

  // copy original link
  const handleCopyOriginal = async (link: string): Promise<void> => {
    await copyToClipboard(link);
  };

  // coopy hexed link
  const handleCopyHexed = async (link: string): Promise<void> => {
    await copyToClipboard(`https://front-test.hex.team/s/${link}`);
  };

  return (
    <section className={styles.session}>
      <h3 className={styles.session__title}>Current session:</h3>
      <div className={styles.session__subtitle}>
        <p className={styles.session__tip}>
          (click a link cell to copy to clipboard)
        </p>
        <button
          className={styles.session__clear}
          type='button'
          onClick={handleClear}
        >
          Clear this session
        </button>
      </div>

      <table className={styles.session__table}>
        <thead>
          <tr>
            <th aria-hidden='true'>&nbsp;</th>
            <th className={styles['session__header-row']}>Original link</th>
            <th className={styles['session__header-row']}>Hexed link</th>
          </tr>
        </thead>
        <tbody>
          {squeezedLinks.map((link) => {
            return (
              <tr className={styles.session__row} key={link.id}>
                <td
                  className={`${styles.session__cell} ${styles.session__cell_id}`}
                >
                  {link.id}
                </td>
                <td
                  className={`${styles.session__cell} ${styles.session__cell_link}`}
                  onClick={() => handleCopyOriginal(link.target)}
                >
                  {link.target}
                </td>
                <td
                  className={`${styles.session__cell} ${styles.session__cell_link}`}
                  onClick={() => handleCopyHexed(link.short)}
                >
                  {link.short}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SqueezerSession;
