export function getErrorMessage(error: any): string {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Invalid password";
    // Add more cases for other Firebase error codes
    default:
      return "An error occurred. Please try again later.";
  }
}
