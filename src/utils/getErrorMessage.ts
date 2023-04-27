import { PostgrestError } from "@supabase/supabase-js";

export function getFirebaseErrorMessage(error: any): string {
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

export function getSupabaseErrorMessage(error: PostgrestError) {
  if (error.details != null) {
    if (error.code === "23505") {
      const matchResult = error.details.match(/\((.*?)\)=\((.*?)\)/);
      if (matchResult != null) {
        const key = matchResult[1];
        const value = matchResult[2];
        return `The ${key} "${value}" already exists. Please choose a different ${key}.`;
      }
    }
    return error.details;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An error occurred. Please try again later.";
}
