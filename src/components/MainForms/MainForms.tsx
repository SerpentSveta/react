import { useFormStore } from '../../store/useFormStore';

export function MainForms() {
  const { FormsAll1, FormsAll2 } = useFormStore();

  return (
    <main className="main">
      <div className="forms-wrapper">
        {FormsAll1.length > 0 && (
          <div className="form1-wrapper">
            <h2>Uncontrolled Forms</h2>
            {FormsAll1.map((form, index) => (
              <div key={index} className="form-item">
                {form.picture && (
                  <img src={form.picture} alt="Uploaded" width={100} />
                )}
                <p>Name: {form.name}</p>
                <p>Age: {form.age}</p>
                <p>Email: {form.email}</p>
                <p>Password: {form.password}</p>
                <p>Gender: {form.gender}</p>
                <p>Country: {form.country}</p>
              </div>
            ))}
          </div>
        )}

        {FormsAll2.length > 0 && (
          <div className="form2-wrapper">
            <h2>Controlled Forms</h2>
            {FormsAll2.map((form, index) => (
              <div key={index} className="form-item">
                {form.picture && (
                  <img src={form.picture} alt="Uploaded" width={100} />
                )}
                <p>Name: {form.name}</p>
                <p>Age: {form.age}</p>
                <p>Email: {form.email}</p>
                <p>Password: {form.password}</p>
                <p>Gender: {form.gender}</p>
                <p>Country: {form.country}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
