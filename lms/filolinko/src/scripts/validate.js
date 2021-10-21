import user from "../data/SignInValidation.json";
export function ValidateLogin(message, setEmailError, setPasswordError) {
  console.log(message);
  if (message.includes("user-not-found")) {
    setEmailError(user.notFound);
  } else if (message.includes("auth/wrong-password")) {
    setPasswordError(user.wrongPassword);
  }
}
