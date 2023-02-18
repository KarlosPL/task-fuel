import React from "react";
import Button from "./Button";

type FormSubmitButtonProps = {
  label: string;
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ label }) => {
  return <Button type="reset">{label}</Button>;
};

export default FormSubmitButton;
