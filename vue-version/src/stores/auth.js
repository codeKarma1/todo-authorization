import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null);
  const loading = ref(true);

  // Track auth state
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    loading.value = false;
  });

  // Signup
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Reset password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update email
  function updateUserEmail(newEmail) {
    if (!auth.currentUser) throw new Error("No user logged in");
    return updateEmail(auth.currentUser, newEmail);
  }

  // Update password
  function updateUserPassword(newPassword) {
    if (!auth.currentUser) throw new Error("No user logged in");
    return updatePassword(auth.currentUser, newPassword);
  }

  // Reauthenticate (required before sensitive changes)
  function reauthenticate(password) {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error("No user logged in");
    }
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    return reauthenticateWithCredential(auth.currentUser, credential);
  }

  return {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    reauthenticate,
  };
});
