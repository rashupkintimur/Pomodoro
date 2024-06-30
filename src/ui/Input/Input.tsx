import { ChangeEvent } from "react";
import "./input.css";

interface IProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  className: string;
}

export const Input = ({ onChange, value, placeholder, className }: IProps) => {
  return (
    <input
      className={`input ${className}`}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
