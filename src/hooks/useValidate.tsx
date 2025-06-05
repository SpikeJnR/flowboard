const useValidate = () => {
  // Email validation function
  const validateEmail = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) {
      return 'The email must contain one character. "@".';
    }

    const [localPart, domainPart] = parts;

    // Checking localPart
    if (!/^[a-z0-9._]+$/i.test(localPart)) {
      return 'The name before "@" can contain only Latin letters, numbers, dots, and underscores.';
    }

    if (/^[._]/.test(localPart) || /[._]$/.test(localPart)) {
      return 'The name cannot begin or end with a period or an underscore.';
    }

    if (/(?:[._-]{2,})/.test(localPart)) {
      return 'Dots or underscores should not be consecutive.';
    }

    // Checking domainPart
    const domainParts = domainPart.split('.');
    if (domainParts.length !== 2) {
      return 'The domain must contain a single dot, for example: gmail.com';
    }

    const [domainName, tld] = domainParts;

    if (!/^[a-z]+$/.test(domainName)) {
      return 'The domain name must contain only Latin letters.';
    }

    if (!['com', 'ru'].includes(tld)) {
      return 'Only ".com" or ".ru" domains are allowed.';
    }

    return null; // We return null if everything is fine.
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordValidates = /^.{8,30}$/;

    if (!passwordValidates.test(password)) {
      return 'The password must be between 8 and 30 characters long.';
    }

    return null; // We return null if everything is fine.
  };

  return { validateEmail, validatePassword };
};

export default useValidate();
