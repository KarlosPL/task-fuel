import React from "react";
import Button from "./Button";

interface FormSubmitButtonProps {
  label: string;
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ label }) => {
  return <Button type="submit">{label}</Button>;
};

export default FormSubmitButton;
