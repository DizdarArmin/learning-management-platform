import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Input from "./shared/Input";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { useUser } from "../state/UserProvider";
import { signIn } from "../scripts/authentication";
import { getDocument } from "../scripts/fireStore";
import { ValidateLogin } from "../scripts/validate";

export default function LoginForm() {
  const { user, setUser, setIsLogged } = useUser();
  const { email, password } = user;
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  function onChange(key, value) {
    const field = { [key]: value };
    setUser({ ...user, ...field });
  }

  async function onSuccess(uid) {
    const document = await getDocument("users", uid);
    setUser(document);
    setIsLogged(true);
    localStorage.setItem("isLogged", true);
    localStorage.setItem("uid", uid);
    history.push("/profile");
  }

  function onFailure(message) {
    ValidateLogin(message, setEmailError, setPasswordError);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const account = await signIn(user.email, user.password);
    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">Login</h1>
      <Input props={[email, onChange, emailError, HTML.email]} />
      <Password props={[password, onChange, passwordError, HTML.password]} />

      <div className="buttons">
        <ButtonSubmit value="Login" />
        <br />
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
}
