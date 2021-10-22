import { useState } from "react";
import { Link } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Input from "./shared/Input";
import Select from "./shared/Select";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { createAccount } from "../scripts/authentication";
import { createDocumentWithId } from "../scripts/fireStore";
import { useHistory } from "react-router";

export default function SignUpForm() {
  const [user, setUser] = useState({});
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [codeError, setCodeError] = useState(HTML.code.message);
  const history = useHistory();

  function onChange(key, value) {
    const field = { [key]: value };
    setUser({ ...user, ...field });
  }

  async function onSuccess(uid) {
    await createDocumentWithId("users", uid, user);
    history.push("/courses");
  }
  function onFailure(message) {}

  async function onSubmit(event) {
    event.preventDefault();
    const account = await createAccount(user.email, user.password);
    account.isCreated ? onSuccess(account.payload) : onFailure(account.payload);
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">Sign up</h1>
      <Input props={[user.name, onChange, nameError, HTML.name]} />
      <Input props={[user.email, onChange, emailError, HTML.email]} />
      <Password
        props={[user.password, onChange, passwordError, HTML.password]}
      />
      <Input props={[user.code, onChange, codeError, HTML.code]} />
      <Select props={[user.gender, onChange, genderError, HTML.gender]} />
      <div className="buttons">
        <ButtonSubmit value="Sign up" />
        <br />
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>
    </form>
  );
}
