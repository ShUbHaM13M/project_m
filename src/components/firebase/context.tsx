import react, { useCallback, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
} from "firebase/auth";
import React from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "./utils";
import { ContextProps } from "./types";

const FirebaseContext = react.createContext<Partial<ContextProps>>({});

export function useFirebase() {
  return useContext(FirebaseContext);
}

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginUser = useCallback((email: string, password: string) => {
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast.promise(promise, {
      pending: "Logging You in",
      success: {
        render({ data }: { data: UserCredential }) {
          setUser(data.user);
          return `Logged in as ${email}`;
        },
      },
      error: {
        render({ data }) {
          return getErrorMessage(data);
        },
      },
    });
  }, []);

  const signOutUser = useCallback((showToast = true) => {
    const promise = signOut(auth)
      .then((_) => setUser(null))
      .catch(getErrorMessage);
    showToast &&
      toast.promise(promise, {
        pending: "Signing out",
        success: {
          render() {
            return "Signed out";
          },
        },
      });
  }, []);

  const resetPassword = useCallback((email: string) => {
    sendPasswordResetEmail(auth, email).then((_) =>
      toast.info(`A password reset mail was sent to ${email}`)
    );
  }, []);

  const signInWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const promise = signInWithPopup(auth, provider);
    toast.promise(promise, {
      pending: "Logging in using Google account",
      success: {
        render({ data }: { data: UserCredential }) {
          setUser(data.user);
          return `Signed in as ${data.user.email}`;
        },
      },
      error:
        "Error occured when signing in with Google. Please try again later",
    });
  }, []);

  const registerUser = useCallback(
    (username: string, email: string, password: string) => {
      const promise = createUserWithEmailAndPassword(auth, email, password);
      toast.promise(promise, {
        pending: "Registering new user",
        success: {
          render({ data }: { data: UserCredential }) {
            setUser(data.user);
            sendEmailVerification(data.user);
            return `A Verification email has been sent to ${email}`;
          },
        },
        error: {
          render({ data }) {
            return getErrorMessage(data);
          },
        },
      });
    },
    []
  );

  const value = {
    user,
    setUser,
    isAuthenticated: user !== null,
    isVerified: user?.emailVerified,
    isLoading: loading,
    loginUser,
    signOutUser,
    registerUser,
    resetPassword,
    signInWithGoogle,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {/* TODO add a loading component */}
      {loading ? <div>Loading...</div> : children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
