// validators.js

export const validateEmail = (email) => {
    // Regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Check if the password length is at least 8 characters
    return password.length >= 8;
  };

  export const validatePhone= (phone) => {
    // Check if the password length is at least 8 characters
    return phone.length >= 11;
  };
  
  export const validateUsername = (userName) => {
    // Check if the username is at least 3 characters long
    return userName.length >= 3;
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    // Check if confirmPassword matches password
    return password === confirmPassword;
  };
  