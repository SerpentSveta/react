import '../forms.css';

import { useCountryStore } from '../../store/useCountriesStore';
import { useEffect } from 'react';
import { countryList } from '../../data/country-list';

export function UncontrolledForm() {
  const { countries, selectedCountry, setSelectedCountry } = useCountryStore();
  const setCountries = useCountryStore((state) => state.setCountries);
  useEffect(() => {
    setCountries(countryList);
  }, [setCountries]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Age:
          <input type="number" name="age" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <fieldset>
          <legend>Gender:</legend>
          <div className="gender">
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" value="male" defaultChecked />
          </div>
          <div className="gender">
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" value="female" />
          </div>
        </fieldset>
        <div className="tnc">
          <input type="checkbox" id="tnc" name="tnc" />
          <label htmlFor="tnc">Accept Terms and Conditions agreement</label>
        </div>
        <label>
          Upload picture:
          <input type="file" accept="image/png, image/jpeg" name="picture" />
        </label>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="country-list"
            name="country"
            value={selectedCountry ?? ''}
            placeholder="Select country"
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>
        <button className="button button-form" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
