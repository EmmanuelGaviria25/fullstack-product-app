export const validateCardNumber = (number: string): boolean => {
  const cardNumberRegex = /^[0-9]{13,19}$/; // Números de 13 a 19 dígitos
  return cardNumberRegex.test(number);
};

export const validateExpirationDate = (date: string): boolean => {
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // Formato MM/AA
  return expirationDateRegex.test(date);
};

export const validateCVV = (cvv: string): boolean => {
  const cvvRegex = /^[0-9]{3,4}$/; // 3 o 4 dígitos
  return cvvRegex.test(cvv);
};

export const validateAddress = (address: string): boolean => {
  return address.trim().length > 5; // Dirección mínima de 5 caracteres
};