import type { DataValues } from '../../services/types';
import { useState, useEffect } from 'react';
import { Spinner } from '../Spinner/Spinner';

function DataTable() {
  const [data, setData] = useState<DataValues[]>([]);
  const [loading, setLoading] = useState(true);

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
            };
          }
        );

        setData(lastYearData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    return <div>Data upload error</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>ISO</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO₂</th>
          <th>CO₂ per capita</th>
        </tr>
      </thead>
      <tbody>
        {data.map((info, index) => (
          <tr key={index}>
            <td>{info.country}</td>
            <td>{info.iso_code ?? 'N/A'}</td>
            <td>{info.year}</td>
            <td>{info.population ?? 'N/A'}</td>
            <td>{info.co2 ?? 'N/A'}</td>
            <td>{info.co2_per_capita ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
