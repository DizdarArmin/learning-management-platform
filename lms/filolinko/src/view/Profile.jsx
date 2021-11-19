import { useState } from "react";

import { useAuth } from "../state/AuthContext";
import { lock, account } from "../data/Icons.json";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Item from "../components/shared/Item";
import EditProfile from "../components/EditProfile";

export default function Profile() {
  const [password, togglePassword] = useState(false);
  const [profile, toggleProfile] = useState(true);
  const { currentUser, userData } = useAuth();

  function showProfile() {
    toggleProfile(true);
    togglePassword(false);
  }
  function showPassword() {
    togglePassword(true);
    toggleProfile(false);
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="padding">
          <h3>Hi, {userData.name}!</h3>
          <br />
          <div className="profile-menu">
            <div className="menu">
              <Item to="Profile" icon={account} click={showProfile} />
              <Item to="Change password" icon={lock} click={showPassword} />
            </div>
            {password && <ChangePasswordForm currentUser={currentUser} />}
            {profile && <EditProfile />}
          </div>
        </div>
      </div>
    </div>
  );
}
