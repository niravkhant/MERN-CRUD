export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
      return false; // Email is required and must be a string
    }
  
    // Regular expression for a basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailRegex.test(email);
  };