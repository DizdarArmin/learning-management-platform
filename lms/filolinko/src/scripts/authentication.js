import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { authInstance } from "./firebase";

export async function getCurrentUser() {
  const user = await authInstance.currentUser;
  if (user) return user;
  else return null;
}

export async function createAccount(email, password) {
  const account = { isCreated: false, payload: "" };
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );

    account.payload = userCredential.user.uid;
    account.isCreated = true;
  } catch (error) {
    account.payload = error.message;
  }

  return account;
}

export async function signIn(email, password) {
  const account = { isLogged: false, payload: "" };

  try {
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    account.payload = userCredential.user.uid;
    account.isLogged = true;
  } catch (error) {
    account.payload = error.message;
  }

  return account;
}

export async function logout() {
  const account = { isLoggout: false, payload: "" };

  try {
    await signOut(authInstance);
    account.isLoggout = true;
    account.payload = "Logout successfully.";
  } catch (error) {
    account.payload = error.code;
  }

  return account;
}

export async function reAuth(currentUser, currentPassword) {
  const account = { didReauth: false, payload: "" };
  const { email } = currentUser;
  const credential = EmailAuthProvider.credential(email, currentPassword);

  try {
    await reauthenticateWithCredential(currentUser, credential);
    account.didReauth = true;
    account.payload = "Reauthenticated";
  } catch (error) {
    account.payload = error.code;
  }
  return account;
}

export async function changePassword(
  currentUser,
  currentPassword,
  newPassword
) {
  const account = { didPasswordChange: false, payload: "" };
  await reAuth(currentUser, currentPassword);
  try {
    await updatePassword(currentUser, newPassword);
    account.didPasswordChange = true;
    account.payload = "Password changed successfully.";
  } catch (error) {
    account.payload = error.code;
  }
  return account;
}
