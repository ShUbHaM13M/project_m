import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebase } from "../../components/firebase/context";
import Input from "../../components/Input";
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useFirebase();
  const navigate = useNavigate();

  const handlePasswordReset = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!emailPattern.test(email)) {
      toast.warning("Enter a valid email address");
      return;
    }
    resetPassword && resetPassword(email);
  };

  const goBack = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div
      className="flex flex-col justify-center gap-2
    mt-6 sm:max-w-md max-w-sm p-6"
    >
      <h3 className="mb-2 text-center">Password Reset</h3>
      <div className="divider mb-2 w-full"></div>
      <p className="mb-4">
        Looks like You forgot Your password <br />
        Enter Your email address to get a password reset link.
      </p>
      <form className="flex gap-2 flex-col al">
        <Input
          containerStyles="mb-0 flex-1"
          labelString="Email"
          name="emailField"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <div className="flex gap-2 mt-2">
          <button onClick={goBack} className="secondary">
            Go back
          </button>
          <button
            type="submit"
            onClick={handlePasswordReset}
            className="primary"
          >
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
