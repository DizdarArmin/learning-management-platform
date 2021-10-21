import LoginForm from "../components/LoginForm";
export default function LoginPage() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="header">
          <div className="image">
            <img src="images/signup.png" alt="computers" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
