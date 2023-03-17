import React from "react";
import Input from "./Input";

interface FormFieldProps {
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField: React.FC<FormFieldProps> = ({ type, name, label, value, placeholder, onChange }) => {
  return (
    <>
      <Input type={type} name={name} label={label} value={value} placeholder={placeholder} onChange={onChange} />
    </>
  );
};

export default FormField;
