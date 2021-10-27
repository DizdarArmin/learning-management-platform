import LoginForm from "../components/LoginForm";
export default function Login() {
  return (
    <div className="container-fluid texture">
      <div className="container">
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
