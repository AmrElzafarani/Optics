import { useState, useEffect } from "react";

function PasswordValidation(config = { min: 6, max: 10 }) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
      console.log("useEffect");
    setPasswordError("");
    if (!password) return;

    if (password.length < config.min) {
      setPasswordError(`Password must be at least ${config.min} Characters`);
    } else {
      if (password.length > config.max) {
        setPasswordError(`Password must be less than ${config.max} Characters`);
      }
    }
  }, [password]);
  return [password, setPassword, passwordError];
}

export default PasswordValidation;
