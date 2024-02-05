import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import styles from './SqueezePage.module.scss';
import Squeezer from '../../components/Squeezer/Squeezer';
import SqueezerSession from '../../components/SqueezerSession/SqueezerSession';
import { RootState } from '../../store/store';

const SqueezePage = (): ReactElement => {
  const squeezedLinks = useSelector(
    (state: RootState) => state.squeezedLinks.links
  );

  return (
    <>
      <Header />
      <main className={styles.squeeze}>
        <h1 className={styles.squeeze__greeting}>Squeeze your link here</h1>
        <Squeezer />
        {squeezedLinks.length > 0 ? <SqueezerSession /> : null}
      </main>
    </>
  );
};

export default SqueezePage;
