import { useEffect, useState } from "react";

import { useUser } from "state/UserProvider";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import Password from "components/shared/PasswordInput";
import HTML from "data/SignUpAttributes.json";
import ButtonSubmit from "components/shared/ButtonSubmit";
import ButtonLink from "components/shared/ButtonLink";
export default function SignUp() {
  const { user, setUser, setIsLogged } = useUser();
  const genders = { label: "Gender", values: ["Male", "Female", "Non-binary"] };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");

  function onSubmit() {}
  return (
    <form className="sign-up">
      <Input HTML={HTML.name} hook={[name, setName]} />
      <small>{nameError}</small>
      <Input HTML={HTML.email} hook={[email, setEmail]} />
      <small>{emailError}</small>
      <Password HTML={HTML.password} hook={[password, setPassword]} />
      <small>{passwordError}</small>
      <Select list={genders} hook={[gender, setGender]} />
      <small>{genderError}</small>
      <div className="buttons">
        <ButtonLink value="Log in" handler={onSubmit} />
        <ButtonSubmit value="Sign up" handler={onSubmit} />
      </div>
    </form>
  );
}
