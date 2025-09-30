import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register user
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // ✅ Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ✅ Logout
  function logout() {
    return signOut(auth);
  }

  // ✅ Password reset
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // ✅ Reauthenticate (needed for email/password updates)
  function reauthenticate(password) {
    if (!auth.currentUser?.email) {
      throw new Error("No current user to reauthenticate");
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    return reauthenticateWithCredential(auth.currentUser, credential);
  }

  // ✅ Update email
  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  // ✅ Update password
  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  // ✅ Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    reauthenticate, // ✅ expose this
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
