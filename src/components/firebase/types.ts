import { User } from "firebase/auth";

type ContextProps = {
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  loginUser: (email: string, password: string) => void;
  signOutUser: (showToast: boolean | null) => void;
  registerUser: (username: string, email: string, password: string) => void;
  resetPassword: (email: string) => void;
  signInWithGoogle: () => void;
};

export type {ContextProps}