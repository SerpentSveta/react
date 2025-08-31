import './DataTable.css';

import type { DataValues } from '../../services/types';
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { useTableStore } from '../../store/useTableStore';

function DataTable() {
  const [data, setData] = useState<DataValues[]>([]);
  const [loading, setLoading] = useState(true);

  const baseColumns = useTableStore((state) => state.baseColumns);
  const optionalColumns = useTableStore((state) => state.optionalColumns);
  const query = useTableStore((state) => state.query);
  const columns = [...baseColumns, ...optionalColumns];
  const filteredData = data.filter((row) =>
    query ? row.country.toLowerCase().includes(query.toLowerCase()) : true
  );

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/SerpentSveta/data-performance/main/owid-co2-data.json'
    )
      .then((res) => res.json())
      .then((json: any) => {
        const lastYearData: DataValues[] = Object.entries(json).map(
          ([country, countryData]: any) => {
            const lastYear = countryData.data.reduce((acc: any, curr: any) =>
              curr.year > acc.year ? curr : acc
            );

            return {
              country,
              iso_code: countryData.iso_code ?? 'N/A',
              year: lastYear.year,
              population: lastYear.population ?? null,
              co2: lastYear.co2 ?? null,
              co2_per_capita: lastYear.co2_per_capita ?? null,
              methane: lastYear.methane ?? null,
              oil_co2: lastYear.oil_co2 ?? null,
              methane_per_capita: lastYear.methane_per_capita ?? null,
              oil_co2_per_capita: lastYear.oil_co2_per_capita ?? null,
            };
          }
        );

        setData(lastYearData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <div>Data upload error</div>;
  }

  return (
    <div className="main-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{row[col as keyof DataValues] ?? 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
