export function AddColumns() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input type="checkbox" id="methane" value="methane" />
        <label htmlFor="methane">methane</label>
      </div>
      <div className="input-wrapper">
        <input
          type="checkbox"
          id="methane_per_capita"
          value="methane_per_capita"
        />
        <label htmlFor="methane_per_capita">methane_per_capita</label>
      </div>
      <div className="input-wrapper">
        <input type="checkbox" id="oil_co2" value="oil_co2" />
        <label htmlFor="oil_co2">oil_co2</label>
      </div>
      <div className="input-wrapper">
        <input
          type="checkbox"
          id="oil_co2_per_capita"
          value="oil_co2_per_capita"
        />
        <label htmlFor="oil_co2_per_capita">oil_co2_per_capita</label>
      </div>
    </form>
  );
}
