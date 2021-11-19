import LoginForm from "../components/LoginForm";
import NavbarHome from "../components/shared/NavbarHome";
export default function Login() {
  return (
    <div className="home">
      <NavbarHome />
      <div className="home-container">
        <div className="header">
          <div className="image">
            <img src="/images/signup.png" alt="computers" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
