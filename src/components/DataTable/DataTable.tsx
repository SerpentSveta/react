import type { DataValues } from '../../services/types';
import { useState, useEffect } from 'react';

export function DataTable() {
  const [data, setData] = useState<DataValues | null>(null);

  useEffect(() => {
    fetch(
      'https://github.com/SerpentSveta/data-performance/blob/main/owid-co2-data.json?raw=true'
    )
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Year</th>
          <th>Population</th>
          <th>ISO</th>
          <th>CO₂</th>
          <th>CO₂ per capita</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          Object.entries(data).map(([country, info]) =>
            info.data.map((item) => (
              <tr key={`${country}-${item.year}`}>
                <td>{country}</td>
                <td>{item.year ? item.year : 'N/A'}</td>
                <td>{item.population}</td>
                <td>{item.co2}</td>
                <td>{item.co2_per_capita}</td>
              </tr>
            ))
          )}
      </tbody>
    </table>
  );
}
