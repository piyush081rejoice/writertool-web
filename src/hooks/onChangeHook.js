import { useState } from "react";

export const useOnChange = (initialValue) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === "checkbox") {
      setInputValue({ ...inputValue, [name]: checked });
    } else if (type === "radio") {
      setInputValue({ ...inputValue, [name]: value });
    } else {
      setInputValue({ ...inputValue, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  return {
    inputValue,
    setInputValue,
    errors,
    setErrors,
    handleChange,
  };
};
