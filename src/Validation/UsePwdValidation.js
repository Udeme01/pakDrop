import { useState } from "react";

export const usePwdValidation = (fieldType) => {
  const [isMinLengthValid, setIsMinLengthValid] = useState(null);
  const [isCapitalLetterValid, setIsCapitalLetterValid] = useState(null);
  const [isNumberValid, setIsNumberValid] = useState(null);
  const [isSpecialCharacterValid, setIsSpecialCharacterValid] = useState(null);

  const handlePasswordChange = (value) => {
    // Check password criteria and update state
    switch (fieldType) {
      case "password":
        setIsMinLengthValid(value.length >= 8);
        setIsCapitalLetterValid(/[A-Z]/.test(value));
        setIsNumberValid(/\d/.test(value));
        setIsSpecialCharacterValid(/[^\w\s]/.test(value));
        break;
      default:
        break;
    }
  };

  const handleConfirmPasswordChange = (value) => {
    // Check confirm password criteria and update state
    switch (fieldType) {
      case "confirmPassword":
        setIsMinLengthValid(value.length >= 8);
        setIsCapitalLetterValid(/[A-Z]/.test(value));
        setIsNumberValid(/\d/.test(value));
        setIsSpecialCharacterValid(/[^\w\s]/.test(value));
        break;
      default:
        break;
    }
  };

  return {
    isMinLengthValid,
    isCapitalLetterValid,
    isNumberValid,
    isSpecialCharacterValid,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
};
