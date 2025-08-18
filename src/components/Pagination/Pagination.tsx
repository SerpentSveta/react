import './Pagination.css';
import type { PaginationProps } from '../../services/types';
import Image from 'next/image';

export function Pagination({ count, page, onChange }: PaginationProps) {
  return (
    <div className="page-container">
      <Image
        className={`arrow ${page === 1 ? 'inactive' : ''}`}
        src={'/arrow_left.png'}
        alt="Arrow Left"
        width={32}
        height={32}
        onClick={() => page > 1 && onChange(page - 1)}
      />
      <p className="number-page">{page}</p>
      <Image
        className={`arrow ${count === page ? 'inactive' : ''}`}
        src={'/arrow_right.png'}
        alt="Arrow Right"
        width={32}
        height={32}
        onClick={() => page < count && onChange(page + 1)}
      />
    </div>
  );
}
