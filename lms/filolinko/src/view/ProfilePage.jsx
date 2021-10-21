import { logout } from "../scripts/authentication";
import { useUser } from "../state/UserProvider";
import { useHistory, withRouter } from "react-router-dom";

function ProfilePage() {
  const { user, setIsLogged } = useUser();
  const history = useHistory();

  async function onLogout() {
    const account = await logout();
    localStorage.setItem("isLogged", false);
    setIsLogged(false);
    history.push("/login");
  }
  return (
    <div>
      <h1>Profile page</h1>
      {JSON.stringify(user)}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
export default withRouter(ProfilePage);
