import { ReactElement } from 'react';

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
    <div>
      <button type='button' onClick={onPrevPage} disabled={currentPage === 0}>
        &lt;
      </button>
      <p>{currentPage + 1}</p>
      <button
        type='button'
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
      >
        &gt;
      </button>
    </div>
  );
};

export default StatsPagination;
