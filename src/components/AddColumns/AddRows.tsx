import { Button } from '../Button/Button';
import { useTableStore } from '../../store/useTableStore';
import type { AddColumnsProps } from '../../services/types';

export function AddColumns({ hide }: AddColumnsProps) {
  const { optionalColumns, toggleColumn } = useTableStore();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="checkbox"
          value="methane"
          checked={optionalColumns.includes('methane')}
          onChange={() => toggleColumn('methane')}
        />
        <label htmlFor="methane">methane</label>
      </div>
      <div className="input-wrapper">
        <input
          type="checkbox"
          value="methane_per_capita"
          checked={optionalColumns.includes('methane_per_capita')}
          onChange={() => toggleColumn('methane_per_capita')}
        />
        <label htmlFor="methane_per_capita">methane_per_capita</label>
      </div>
      <div className="input-wrapper">
        <input
          type="checkbox"
          value="oil_co2"
          checked={optionalColumns.includes('oil_co2')}
          onChange={() => toggleColumn('oil_co2')}
        />
        <label htmlFor="oil_co2">oil_co2</label>
      </div>
      <div className="input-wrapper">
        <input
          type="checkbox"
          value="oil_co2_per_capita"
          checked={optionalColumns.includes('oil_co2_per_capita')}
          onChange={() => toggleColumn('oil_co2_per_capita')}
        />
        <label htmlFor="oil_co2_per_capita">oil_co2_per_capita</label>
      </div>
      <Button className="button button-in-modal" onClick={hide} type="button">
        Save
      </Button>
    </form>
  );
}
