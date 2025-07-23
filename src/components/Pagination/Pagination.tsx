import arrow_left from '/arrow_left.png';
import arrow_right from '/arrow_right.png';
import type { PaginationProps } from '../../services/types';

export function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <div className="page-container">
      <img
        className={`arrow ${count === 1 ? 'inactive' : ''}`}
        src={arrow_left}
        alt="Arrow Left"
        onClick={() => page > 1 && onChange(page - 1)}
      />
      <p>{page}</p>
      <img
        className={`arrow ${count === page ? 'inactive' : ''}`}
        src={arrow_right}
        alt="Arrow Right"
        onClick={() => page < count && onChange(page + 1)}
      />
    </div>
  );
}
