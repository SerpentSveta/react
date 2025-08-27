export type DataValues = {
  [country: string]: CountryData;
};

export type CountryData = {
  iso_code: string;
  data: [DataByYear];
};

export type DataByYear = {
  year: number | null;
  population: number | null;
  co2: number | null;
  co2_per_capita: number | null;
};
