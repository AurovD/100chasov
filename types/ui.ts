export interface ButtonProps {
  children: React.ReactNode;
  action?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}


import type { E164Number } from 'libphonenumber-js'; 
export interface PhoneNumberInputProps {
    name: string;
    value: E164Number | undefined;
    onChange: (value: E164Number | undefined) => void;
    className?: string;
};