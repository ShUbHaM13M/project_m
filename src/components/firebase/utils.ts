
function getErrorMessage(error: any) {
  const errorCode = error.code;
  let errorMessage = "";
  switch (errorCode) {
    case "auth/user-not-found":
      errorMessage = "User with that email not found";
      break;
    case "auth/wrong-password":
      errorMessage = "Wrong password. Please try again";
      break;
    case "auth/email-already-in-use":
      errorMessage = "Account for that email already exists";
      break;
    case "auth/invalid-email":
      errorMessage = "Please provide a valid email";
      break;
    case "auth/weak-password":
      errorMessage = "Password is too weak";
    default:
      break;
  }
  return errorMessage;
}

export { getErrorMessage }