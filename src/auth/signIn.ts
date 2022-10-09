import { Auth } from "aws-amplify";

export async function signIn(username: string, password: string):Promise<boolean> {
  try {
    await Auth.signIn(username, password)
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}
