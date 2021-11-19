import { useEffect, useState } from "react";

import { changePassword } from "../scripts/authentication";
import Password from "./shared/Password";
import HTML from "../data/ChangePassword.json";
import ButtonSubmit from "./shared/ButtonSubmit";

export default function ChangePasswordForm({ currentUser }) {
  const [current, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (newPassword !== confirm) {
      setMessage("Passwords don't match.");
    } else {
      setMessage("");
    }
  }, [confirm]);

  async function onSubmit(e) {
    e.preventDefault();
    const account = await changePassword(currentUser, current, newPassword);
    const payload = account.payload;
    account.isLogged ? setMessage(payload) : onFailure(payload);
  }
  function onFailure(payload) {
    if (payload.includes("requires-recent-login")) {
      setMessage("Current password was incorrect.");
    } else {
      setMessage(payload);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <Password hook={[current, setCurrent, HTML.current]} />
      <Password hook={[newPassword, setNew, HTML.new]} />
      <Password hook={[confirm, setConfirm, HTML.confirm]} />
      <small>{message}</small>
      <ButtonSubmit value="Change password" />
    </form>
  );
}
