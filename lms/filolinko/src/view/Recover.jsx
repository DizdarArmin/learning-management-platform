import { useState } from "react";
import Input from "../components/shared/Input";
import ButtonSubmit from "../components/shared/ButtonSubmit";
import HTML from "../data/SignUpAttributes.json";
import { recover } from "../scripts/authentication";
import NavbarHome from "../components/shared/NavbarHome";
export default function Recover() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const account = await recover(email);
    account.didReset
      ? setMessage(account.payload)
      : setMessage(account.payload);
  }
  return (
    <div className="container-fluid">
      <NavbarHome />
      <div className="container">
        <div className="holder">
          <form onSubmit={onSubmit} className="recover">
            <h3>Recover password</h3>
            <br />
            <Input hook={[email, setEmail, HTML.email]} />
            <small>{message}</small>
            <ButtonSubmit value="Recover" />
          </form>
        </div>
      </div>
    </div>
  );
}
