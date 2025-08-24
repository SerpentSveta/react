import '../forms.css';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCountryStore } from '../../store/useCountriesStore';
import { useFormStore } from '../../store/useFormStore';
import { useForm } from 'react-hook-form';

type ControlledFormProps = {
  onSuccess: () => void;
};

export const ControlledForm = ({ onSuccess }: ControlledFormProps) => {
  const { countries } = useCountryStore();
  const setForm2 = useFormStore((state) => state.setForm2);

  const formShema = z
    .object({
      name: z
        .string()
        .regex(/^[A-ZА-Я]/, 'Name must start with an uppercase letter'),
      age: z.number('Age must be a number').gt(0, 'Age cannot be negative'),
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
      confirmPassword: z.string().min(1, 'Confirm password is required'),
      gender: z.enum(['male', 'female']),
      tnc: z.boolean().refine((val) => val === true, {
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

  type FormData = z.infer<typeof formShema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formShema),
    mode: 'onBlur',
    defaultValues: {
      gender: 'male',
      tnc: false,
    },
  });

  const onSubmit = (data: FormData) => {
    const file = data.picture;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm2({
          ...data,
          picture: reader.result as string,
        });
        onSuccess();
      };
      reader.readAsDataURL(file);
    } else {
      setForm2({
        ...data,
        picture: '',
      });
      onSuccess();
    }
  };

  return (
    <>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" {...register('name')} />
          {errors.name && <div className="error">{errors.name.message}</div>}
        </label>
        <label>
          Age:
          <input type="number" {...register('age', { valueAsNumber: true })} />
          {errors.age && <div className="error">{errors.age.message}</div>}
        </label>
        <label>
          Email:
          <input type="email" {...register('email')} />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </label>
        <label>
          Password:
          <input type="password" {...register('password')} />
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}
        </label>
        <label>
          Confirm Password:
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword.message}</div>
          )}
        </label>
        <fieldset>
          <legend>Gender:</legend>
          <div className="gender">
            <label htmlFor="male">Male</label>
            <input type="radio" value="male" {...register('gender')} />
          </div>
          <div className="gender">
            <label htmlFor="female">Female</label>
            <input type="radio" value="female" {...register('gender')} />
          </div>
        </fieldset>
        <div className="tnc">
          <input type="checkbox" {...register('tnc')} />
          <label htmlFor="tnc">Accept Terms and Conditions agreement</label>
        </div>
        {errors.tnc && <div className="error">{errors.tnc.message}</div>}
        <label>
          Upload picture:
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue('picture', file, { shouldValidate: true });
              }
            }}
          />
          {errors.picture && (
            <div className="error">{errors.picture.message}</div>
          )}
        </label>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="country-list"
            placeholder="Select country"
            {...register('country')}
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <div className="error">{errors.country.message}</div>
          )}
        </div>
        <button className="button button-form" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
