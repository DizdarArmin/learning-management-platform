import { logout } from "../scripts/authentication";
import { useHistory } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { getDocument } from "../scripts/fireStore";
import { useEffect, useState } from "react";
import useDocument from "../components/hooks/useDocument";
import Navbar from "../components/shared/Navbar";

import ChangePasswordForm from "../components/ChangePasswordForm";
import Item from "../components/shared/Item";

export default function ProfilePage() {
  const [password, togglePassword] = useState(false);
  const [profile, toggleProfile] = useState(true);
  const { currentUser } = useAuth();
  const { data: userData } = useDocument("users", currentUser.uid);
  const history = useHistory();

  useEffect(() => {
    password ? toggleProfile(false) : toggleProfile(true);
  }, [password]);

  useEffect(() => {
    profile ? togglePassword(false) : togglePassword(true);
  }, [profile]);

  useEffect(() => {
    const userDat = getDocument("users", currentUser.uid);
  }, []);

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container">
        <div className="header">
          <div className="menu">
            <h3>Hi, {userData.name}!</h3>
            <br />
            <Item to="Profile" icon="user-circle" activate={toggleProfile} />
            <Item to="Change password" icon="lock" activate={togglePassword} />
          </div>
          {password && <ChangePasswordForm currentUser={currentUser} />}
          {profile && <h2>Profile</h2>}
        </div>
      </div>
    </div>
  );
}
