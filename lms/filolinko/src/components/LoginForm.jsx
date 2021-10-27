import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Input from "./shared/Input";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { signIn } from "../scripts/authentication";

import { ValidateLogin } from "../scripts/validate";

import Loading from "../view/Loading";

export default function LoginForm() {
  const [user, setUser] = useState({
    email: "armin.dizdar@gmail.com",
    password: "123456789",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function onChange(key, value) {
    const field = { [key]: value };
    setUser({ ...user, ...field });
  }

  function onSuccess(uid) {
    setLoading(false);
    history.push("/courses");
  }

  function onFailure(message) {
    setLoading(false);
    ValidateLogin(message, setEmailError, setPasswordError);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const account = await signIn(user.email, user.password);
    account.isLogged ? onSuccess(account.payload) : onFailure(account.payload);
  }

  if (loading) return <Loading />;
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="title">Login</h2>
      <Input props={[user.email, onChange, emailError, HTML.email]} />
      <Password
        props={[user.password, onChange, passwordError, HTML.password]}
      />

      <div className="buttons">
        <ButtonSubmit value="Login" />
        <br />
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </form>
  );
}
