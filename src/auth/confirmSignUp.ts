import { Auth } from "aws-amplify";

export async function resendConfirmationCode(
  username: string
): Promise<boolean> {
  try {
    await Auth.resendSignUp(username);
    return true;
  } catch (error) {
    return false;
  }
}

export async function confirmSignUp(
  username: string,
  code: string
): Promise<boolean> {
  try {
    await Auth.confirmSignUp(username, code);
    return true;
  } catch (error) {
    return false;
  }
}
