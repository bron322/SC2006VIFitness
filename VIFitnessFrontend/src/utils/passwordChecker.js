export default function checkPassword(s) {
  return (
    s.length > 6 &&
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(s) && // At least one special character
    /[a-zA-Z]/.test(s) && // At least one alphabet
    /\d/.test(s) && // At least one number
    /[a-z]/.test(s) &&
    /[A-Z]/.test(s) // At least one uppercase and one lowercase character
  );
}
