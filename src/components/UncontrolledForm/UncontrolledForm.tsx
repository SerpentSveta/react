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
      <div>Uncontrolled Form</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
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
          <div>
            <input type="radio" name="gender" value="male" defaultChecked />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <div>
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
            onChange={(e) => setSelectedCountry(e.target.value)}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
