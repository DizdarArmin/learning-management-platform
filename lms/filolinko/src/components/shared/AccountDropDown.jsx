import { useState } from "react";
import { useHistory } from "react-router-dom";

import { logout } from "../../scripts/authentication";
import { signout, account, up, down } from "../../data/Icons.json";

import Item from "./Item";
import Modal from "./Modal";
import Confirm from "./Confirm";

export default function AccountDropDown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modal, setShowModal] = useState(false);
  const history = useHistory();

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function toAccount() {
    history.push("/profile");
  }
  async function onLogout() {
    await logout();

    history.push("/login");
  }

  return (
    <span onClick={toggleDropdown}>
      {showDropdown && <i className={up} />}
      {!showDropdown && <i className={down} />}
      {showDropdown && (
        <div className="account-dropdown">
          <Item to="Account settings" icon={account} click={toAccount} />
          <Item to="Sign out" icon={signout} click={() => setShowModal(true)} />
        </div>
      )}
      <Modal hook={[modal, setShowModal]}>
        <Confirm value="logout" yes={onLogout} no={() => setShowModal(false)} />
      </Modal>
    </span>
  );
}
