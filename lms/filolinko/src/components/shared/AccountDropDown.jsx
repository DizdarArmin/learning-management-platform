import { useState } from "react";
import { useHistory } from "react-router-dom";

import { logout } from "../../scripts/authentication";
import { signout, account, up, down } from "../../data/Icons.json";
import Item from "./Item";

export default function AccountDropDown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function toAccount() {
    history.push("/profile");
  }
  async function onLogout() {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      await logout();
      setShowDropdown(!showDropdown);
      history.push("/login");
    } else {
      return null;
    }
  }
  return (
    <span onClick={toggleDropdown}>
      {showDropdown && <i className={up} />}
      {!showDropdown && <i className={down} />}
      {showDropdown && (
        <div className="account-dropdown">
          <Item to="Account settings" icon={account} click={toAccount} />
          <Item to="Sign out" icon={signout} click={onLogout} />
        </div>
      )}
    </span>
  );
}
