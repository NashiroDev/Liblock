// Email validation
export const validateEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
    // Perform any custom password validation logic here
    return password.length >= 8; // Example: Password must be at least 8 characters long
};