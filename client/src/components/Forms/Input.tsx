import React from 'react';

type InputProps = {
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ type, name, label, value, placeholder, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-left text-sm" htmlFor={name}>{label}</label>
      <input
        className="mt-2 border-0 border-b-2 border-blue-500 p-2 outline-none"
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
