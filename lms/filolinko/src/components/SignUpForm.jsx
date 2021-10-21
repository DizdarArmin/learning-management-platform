import { useState } from "react";
import { Link } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Input from "./shared/Input";
import Select from "./shared/Select";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { useUser } from "../state/UserProvider";
import { useAuth } from "../state/AuthContext";
import { createAccount } from "../scripts/authentication";
import { createDocumentWithId } from "../scripts/fireStore";

export default function SignUpForm() {
  const { signUp } = useAuth();
  const { user, setUser, setIsLogged } = useUser();
  const { name, email, password, gender, code } = user;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [codeError, setCodeError] = useState(HTML.code.message);

  function onChange(key, value) {
    const field = { [key]: value };
    setUser({ ...user, ...field });
  }

  async function onSuccess(uid) {
    const newUser = { name: user.name, gender: user.gender, role: "student" };
    await createDocumentWithId("users", uid, newUser);
    setIsLogged(true);
    setUser(newUser);
  }
  function onFailure(message) {}

  async function onSubmit(event) {
    event.preventDefault();
    console.log(user);
    const account = await signUp(user.email, user.password);
    /*  account.isCreated ? onSuccess(account.payload) : onFailure(account.payload); */
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="title">Sign up</h1>
      <Input props={[name, onChange, nameError, HTML.name]} />
      <Input props={[email, onChange, emailError, HTML.email]} />
      <Password props={[password, onChange, passwordError, HTML.password]} />
      <Input props={[code, onChange, codeError, HTML.code]} />
      <Select props={[gender, onChange, genderError, HTML.gender]} />
      <div className="buttons">
        <ButtonSubmit value="Sign up" />
        <br />
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
      </div>
    </form>
  );
}
