import '../forms.css';

import { z } from 'zod';
import { useCountryStore } from '../../store/useCountriesStore';
import { useState } from 'react';

type UncontrolledFormProps = {
  onSuccess: () => void;
};

export const UncontrolledForm = ({ onSuccess }: UncontrolledFormProps) => {
  const { countries } = useCountryStore();
  const [errors, setErrors] = useState<
    z.core.$ZodFormattedError<
      {
        name: string;
        age: number;
        email: string;
        password: string;
        confirmPassword: string;
        tnc: string;
        country: string;
        picture: z.core.File;
      },
      string
    >
  >({ _errors: [] });

  const formShema = z
    .object({
      name: z
        .string()
        .regex(/^[A-ZА-Я]/, 'Name must start with an uppercase letter'),
      age: z.coerce
        .number('Age must be a number')
        .gt(0, 'Age cannot be negative'),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('The email must contain "@" and a valid domain'),
      password: z.string().refine(
        (val) => {
          return (
            /[0-9]/.test(val) &&
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /[^a-zA-Z0-9]/.test(val)
          );
        },
        {
          message:
            'Password must contain at least 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
        }
      ),
      confirmPassword: z.string(),
      tnc: z.string().refine((val) => val === 'on', {
        message: 'You must accept Terms and Conditions',
      }),
      country: z
        .string()
        .refine(
          (val) => countries.includes(val),
          'Country must be selected from the list'
        ),
      picture: z
        .file()
        .max(5_000_000, 'The maximum file size is 5 MB')
        .mime(['image/png', 'image/jpeg'], 'Only PNG and JPEG are allowed'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const validation = formShema.safeParse(data);
    if (!validation.success) {
      const errors = validation.error.format();
      setErrors(errors);
    } else {
      onSuccess();
    }
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" defaultValue="" />
          {errors.name && (
            <div className="error">{errors.name._errors.join(',')}</div>
          )}
        </label>
        <label>
          Age:
          <input type="text" name="age" defaultValue="" />
          {errors.age && (
            <div className="error">{errors.age._errors.join(',')}</div>
          )}
        </label>
        <label>
          Email:
          <input type="text" name="email" defaultValue="" />
          {errors.email && (
            <div className="error">{errors.email._errors.join(',')}</div>
          )}
        </label>
        <label>
          Password:
          <input type="password" name="password" defaultValue="" />
          {errors.password && (
            <div className="error">{errors.password._errors.join(',')}</div>
          )}
        </label>
        <label>
          Confirm password:
          <input type="password" name="confirmPassword" defaultValue="" />
          {errors.confirmPassword && (
            <div className="error">
              {errors.confirmPassword._errors.join(',')}
            </div>
          )}
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
          <input type="hidden" name="tnc" value="off" />
          <input type="checkbox" id="tnc" name="tnc" value="on" />
          <label htmlFor="tnc">Accept Terms and Conditions agreement</label>
        </div>
        {errors.tnc && (
          <div className="error">{errors.tnc._errors.join(',')}</div>
        )}
        <label>
          Upload picture:
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="picture"
            defaultValue=""
          />
          {errors.picture && (
            <div className="error">{errors.picture._errors.join(', ')}</div>
          )}
        </label>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="country-list"
            name="country"
            placeholder="Select country"
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <div className="error">{errors.country._errors.join(',')}</div>
          )}
        </div>
        <button className="button button-form" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
