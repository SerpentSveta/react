import { create } from 'zustand';

interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  tnc: boolean;
  picture: string;
  country: string;
}

interface FormState {
  FormsAll1: FormValues[];
  FormsAll2: FormValues[];
  setForm1: (data: FormValues) => void;
  setForm2: (data: FormValues) => void;
}

export const useFormStore = create<FormState>()((set) => ({
  FormsAll1: [],
  FormsAll2: [],
  setForm1: (data: FormValues) =>
    set((state) => ({ FormsAll1: [...state.FormsAll1, data] })),
  setForm2: (data: FormValues) =>
    set((state) => ({ FormsAll2: [...state.FormsAll2, data] })),
}));
