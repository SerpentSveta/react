import '../forms.css';
import { z } from 'zod';
import { useCountryStore } from '../../store/useCountriesStore';
import { useFormStore } from '../../store/useFormStore';
import { useState } from 'react';

type UncontrolledFormProps = {
  onSuccess: () => void;
};

export const UncontrolledForm = ({ onSuccess }: UncontrolledFormProps) => {
  const { countries } = useCountryStore();
  const setForm1 = useFormStore((state) => state.setForm1);

  const [errors, setErrors] = useState<
    z.ZodFormattedError<{
      name: string;
      age: number;
      email: string;
      password: string;
      confirmPassword: string;
      gender: 'male' | 'female';
      tnc: boolean;
      country: string;
      picture: string;
    }>
  >({ _errors: [] });

  const formSchema = z
    .object({
      name: z
        .string()
        .regex(/^[A-ZА-Я]/, 'Name must start with an uppercase letter'),
      age: z.number().gt(0, 'Age cannot be negative'),
      email: z.string().min(1, 'Email is required').email(),
      password: z
        .string()
        .refine(
          (val) =>
            /[0-9]/.test(val) &&
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /[^a-zA-Z0-9]/.test(val),
          {
            message:
              'Password must contain at least 1 number, 1 uppercase, 1 lowercase, 1 special character',
          }
        ),
      confirmPassword: z.string(),
      gender: z.enum(['male', 'female']),
      tnc: z
        .boolean()
        .refine((val) => val === true, 'You must accept Terms and Conditions'),
      country: z
        .string()
        .refine(
          (val) => countries.includes(val),
          'Country must be from the list'
        ),
      picture: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const gender = (formData.get('gender') as 'male' | 'female') ?? 'male';
    const tnc = formData.get('tnc') === 'on';
    const pictureFile = formData.get('picture') as File | null;

    const dataToValidate = {
      name: (formData.get('name') as string) || '',
      age: Number(formData.get('age')),
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      confirmPassword: (formData.get('confirmPassword') as string) || '',
      gender,
      tnc,
      country: (formData.get('country') as string) || '',
      picture: '',
    };

    const validation = formSchema.safeParse(dataToValidate);
    if (!validation.success) {
      setErrors(validation.error.format());
      return;
    }

    if (pictureFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm1({
          ...validation.data,
          picture: reader.result as string,
        });
        onSuccess();
      };
      reader.readAsDataURL(pictureFile);
    } else {
      setForm1({
        ...validation.data,
        picture: '',
      });
      onSuccess();
    }
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
          {errors.name && (
            <div className="error">{errors.name._errors.join(', ')}</div>
          )}
        </label>

        <label>
          Age:
          <input type="text" name="age" />
          {errors.age && (
            <div className="error">{errors.age._errors.join(', ')}</div>
          )}
        </label>

        <label>
          Email:
          <input type="text" name="email" />
          {errors.email && (
            <div className="error">{errors.email._errors.join(', ')}</div>
          )}
        </label>

        <label>
          Password:
          <input type="password" name="password" />
          {errors.password && (
            <div className="error">{errors.password._errors.join(', ')}</div>
          )}
        </label>

        <label>
          Confirm password:
          <input type="password" name="confirmPassword" />
          {errors.confirmPassword && (
            <div className="error">
              {errors.confirmPassword._errors.join(', ')}
            </div>
          )}
        </label>

        <fieldset>
          <legend>Gender:</legend>
          <div className="gender">
            <label>Male</label>
            <input type="radio" name="gender" value="male" defaultChecked />
          </div>
          <div className="gender">
            <label>Female</label>
            <input type="radio" name="gender" value="female" />
          </div>
        </fieldset>

        <div className="tnc">
          <input type="checkbox" name="tnc" id="tnc" />
          <label htmlFor="tnc">Accept Terms and Conditions</label>
        </div>
        {errors.tnc && (
          <div className="error">{errors.tnc._errors.join(',')}</div>
        )}

        <label>
          Upload picture:
          <input type="file" name="picture" accept="image/png, image/jpeg" />
          {errors.picture && (
            <div className="error">{errors.picture._errors.join(', ')}</div>
          )}
        </label>

        <div>
          <label>Country</label>
          <input list="country-list" name="country" />
          <datalist id="country-list">
            {countries.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.country && (
            <div className="error">{errors.country._errors.join(', ')}</div>
          )}
        </div>

        <button className="button button-form" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
