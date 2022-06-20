import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../components/firebase/context";
import Input from "../../components/Input";

interface formData {
  username: string;
  email: string;
  password: string;
}
const initialState = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [state, setState] = useState<formData>(initialState);
  const { isAuthenticated, registerUser } = useFirebase();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home", { replace: true });
  }, [isAuthenticated]);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = state;
    if (username.length < 6 || password.length < 6) return;
    registerUser && registerUser(username, email, password);
    setState(initialState);
  };

  return (
    <div
      className="flex flex-col items-stretch justify-center 
      gap-2 md:gap-6 md:flex-row
      mt-6 px-4 max-w-xs md:max-w-3xl"
    >
      <div className="flex flex-col gap-2">
        <h2>Welcome</h2>
        <p>Sign up to create a new account</p>
      </div>
      <form
        onSubmit={handleSignup}
        className="md:mt-0 mt-4 flex flex-col md:w-2/4"
      >
        <div>
          <Input
            labelString="Username"
            name="username"
            placeholder="SeyTonic13"
            type="text"
            value={state.username}
            required
            onChange={handleChange}
          />
          <Input
            labelString="Email"
            name="email"
            placeholder="SeyTonic@mail.com"
            type="email"
            value={state.email}
            required
            onChange={handleChange}
          />
          <Input
            labelString="Password"
            name="password"
            placeholder="sdouo1f1h"
            type="password"
            value={state.password}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary my-2">
          Sign up
        </button>
        <div className="divider w-3/4 mx-auto my-4 opacity-40"></div>
        <p className="text-sm text-center">
          Already have an account ?
          <Link to="/login" className="text-accent ml-1">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
