import './MainForms.css';

import { useFormStore } from '../../store/useFormStore';
import { useState, useEffect } from 'react';

export function MainForms() {
  const { FormsAll1, FormsAll2 } = useFormStore();

  const [bordered, setBordered] = useState<string | null>(null);

  useEffect(() => {
    if (FormsAll1.length > 0) {
      setBordered('form1-' + (FormsAll1.length - 1));
      setTimeout(() => setBordered(null), 3000);
    }
  }, [FormsAll1]);

  useEffect(() => {
    if (FormsAll2.length > 0) {
      setBordered('form2-' + (FormsAll2.length - 1));
      setTimeout(() => setBordered(null), 3000);
    }
  }, [FormsAll2]);

  return (
    <main className="main">
      <div className="forms-wrapper">
        {FormsAll1.length > 0 && (
          <div className="form-wrapper">
            <h2>Uncontrolled Forms</h2>
            {FormsAll1.map((form, index) => {
              const id = 'form1-' + index;
              return (
                <div
                  key={index}
                  className={`form-item ${bordered === id ? 'bordered' : ''}`}
                >
                  {form.picture && <img src={form.picture} alt="Uploaded" />}
                  <div className="form-info">
                    <p>Name: {form.name}</p>
                    <p>Age: {form.age}</p>
                    <p>Email: {form.email}</p>
                    <p>Password: {form.password}</p>
                    <p>Gender: {form.gender}</p>
                    <p>Country: {form.country}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {FormsAll2.length > 0 && (
          <div className="form-wrapper">
            <h2>Controlled Forms</h2>
            {FormsAll2.map((form, index) => {
              const id = 'form2-' + index;
              return (
                <div
                  key={index}
                  className={`form-item ${bordered === id ? 'bordered' : ''}`}
                >
                  {form.picture && <img src={form.picture} alt="Uploaded" />}
                  <div className="form-info">
                    <p>Name: {form.name}</p>
                    <p>Age: {form.age}</p>
                    <p>Email: {form.email}</p>
                    <p>Password: {form.password}</p>
                    <p>Gender: {form.gender}</p>
                    <p>Country: {form.country}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
