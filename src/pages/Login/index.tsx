import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../components/firebase/context";
import Input from "../../components/Input";

interface formData {
  email: string;
  password: string;
}

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  } as formData);

  const { isAuthenticated, loginUser, user, signInWithGoogle, isVerified } =
    useFirebase();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!state.email.length || state.password.length < 6) return;
    loginUser && loginUser(state.email, state.password);
  };

  useEffect(() => {
    if (isAuthenticated && isVerified) navigate("/home", { replace: true });
    if (isAuthenticated && !isVerified) navigate("/not-verified");
  }, [isAuthenticated, isVerified]);

  return (
    <div
      className="flex flex-col items-stretch justify-center 
      gap-2 md:gap-6 md:flex-row
      mt-6 px-4 max-w-xs md:max-w-3xl"
    >
      <div className="flex flex-col gap-2">
        <h2>Welcome</h2>
        <p>Login to start managing Your projects</p>
      </div>
      <form className="md:mt-0 mt-4 flex flex-col md:w-2/4">
        <div>
          <Input
            name="email"
            labelString="Email"
            placeholder="SeyTonic@mail.com"
            type="email"
            value={state.email}
            required
            onChange={handleChange}
          />
          <Input
            name="password"
            labelString="Password"
            placeholder="kljsadioh"
            type="password"
            required
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => navigate("/password-reset")}
          className="link mb-4 my-1"
        >
          forgot password ?
        </button>
        <button onClick={handleLogin} className="primary mb-4">
          Login
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            signInWithGoogle && signInWithGoogle();
          }}
          className="text-primary mx-auto w-full bg-secondary"
        >
          Sign in with Google
        </button>
        <div className="divider w-3/4 mx-auto my-4 opacity-40"></div>
        <p className="text-sm text-center">
          Don't have an account ?
          <Link to="/signup" className="text-accent ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
