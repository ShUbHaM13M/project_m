import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../components/firebase/context";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

const NotVerified = () => {
  const { isVerified, user, signOutUser, isAuthenticated } = useFirebase();
  const navigate = useNavigate();

  function handleSendVerification() {
    if (user) {
      const promise = sendEmailVerification(user);
      toast.promise(promise, {
        pending: "Sending verification mail",
        success: "Verification mail sent",
        error: "Error occured, please try again later",
      });
    }
  }

  function handleBackToLogin() {
    signOutUser && signOutUser(false);
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
    if (isVerified) navigate("/home", { replace: true });
  }, [isAuthenticated, isVerified]);

  return (
    <div
      className="flex flex-col justify-center gap-2
    mt-6 px-4 max-w-lg"
    >
      <h3 className="mb-2 text-center">Awaiting account verification</h3>
      <div className="divider mb-2 w-full"></div>
      <p className="mb-4">
        Your account has not been verified yet. <br />
        Please check Your email for a verification link <br />
        if You didn't receive a mail, click on the button below to resend
        verification mail <br />
      </p>
      <div className="flex gap-2">
        <button onClick={handleBackToLogin} className="secondary">
          Back to Login
        </button>
        <button onClick={handleSendVerification} className="primary">
          Resend mail
        </button>
      </div>
    </div>
  );
};

export default NotVerified;
