import { useState } from "react";
import { Link } from "react-router-dom";

import HTML from "../data/SignUpAttributes.json";
import Input from "./shared/Input";
import Password from "./shared/Password";
import ButtonSubmit from "./shared/ButtonSubmit";
import { createAccount } from "../scripts/authentication";
import { createDocumentWithId } from "../scripts/fireStore";
import { useHistory } from "react-router";
import useDocument from "../hooks/useDocument";

export default function SingUpForm() {
  const history = useHistory();
  const { document } = useDocument("auth", "code");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function onSuccess(uid) {
    await createDocumentWithId("users", uid, {
      name: name,
      role: "student",
    });
    history.push("/courses");
  }
  function onFailure(message) {
    setError(message);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (code === document.code) {
      setError("");
      const account = await createAccount(email, password);
      account.isCreated
        ? onSuccess(account.payload)
        : onFailure(account.payload);
    } else {
      setError("Wrong authentication code.");
    }
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="title">Sign up</h2>

      <Input hook={[name, setName, HTML.name]} />
      <Input hook={[email, setEmail, HTML.email]} />
      <Password hook={[password, setPassword, HTML.password]} />
      <Input hook={[code, setCode, HTML.code]} />
      <small>{error}</small>
      <div className="buttons-credentials">
        <ButtonSubmit value="Sign up" />
        <div>
          <p>Already have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </form>
  );
}
