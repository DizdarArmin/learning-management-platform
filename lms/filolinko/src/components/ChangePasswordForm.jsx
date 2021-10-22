import { useEffect, useState } from "react";
import { changePassword, reAuth } from "../scripts/authentication";
import Password from "./shared/Password";
import HTML from "../data/ChangePassword.json";
import ButtonSubmit from "./shared/ButtonSubmit";
export default function ChangePasswordForm({ currentUser }) {
  const [password, setPassword] = useState({});
  const [message, setMessage] = useState("");

  function onChange(key, value) {
    const field = { [key]: value };
    setPassword({ ...password, ...field });
  }

  useEffect(() => {
    if (password.new != password.confirm) {
      setMessage("Passwords don't match.");
    } else {
      setMessage("");
    }
  }, [password.confirm]);

  async function onSubmit(e) {
    e.preventDefault();
    const account = await changePassword(
      currentUser,
      password.current,
      password.new
    );
    const payload = account.payload;

    account.isLogged ? setMessage(payload) : setMessage(payload);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>Change password</h3>
      <br />
      <Password props={[password.current, onChange, null, HTML.current]} />
      <Password props={[password.new, onChange, null, HTML.new]} />
      <Password props={[password.confirm, onChange, null, HTML.confirm]} />
      <small>{message}</small>
      <ButtonSubmit value="Change password" />
    </form>
  );
}
