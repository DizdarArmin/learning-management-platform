import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { signIn } from "../scripts/authentication";

import { ValidateLogin } from "../scripts/validate";
import Input from "./shared/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  function onSuccess(uid) {
    history.push("/courses");
  }

  function onFailure(message) {
    ValidateLogin(message, setEmailError, setPasswordError);
  }

  async function onSubmit(event) {
    setEmailError("");
    setPasswordError("");
    event.preventDefault();
    const account = await signIn(email, password);
    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="title">Login</h2>
      <Input hook={[email, setEmail, HTML.email]} />
      <Password hook={[password, setPassword, HTML.password]} />

      <div className="error">
        {emailError}
        <br />
        {passwordError}
      </div>
      <div className="buttons-credentials">
        <ButtonSubmit value="Login" />
        <div>
          Don't have an account? &nbsp;
          <Link to="/register">Sign up</Link>
        </div>

        <div>
          Forgot password? &nbsp;
          <Link to="/recover">Recover</Link>
        </div>
      </div>
    </form>
  );
}
