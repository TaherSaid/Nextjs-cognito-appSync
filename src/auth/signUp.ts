import { Auth } from "aws-amplify";

export async function signUp(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const user = await Auth.signUp({
      username,
      password,
    });
    return true;
  } catch (error) {
    return false;
  }
}
