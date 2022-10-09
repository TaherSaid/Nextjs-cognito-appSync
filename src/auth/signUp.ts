import { Auth } from "aws-amplify";

export async function signUp(
  username: string,
  password: string
): Promise<boolean> {
  console.log(username);
  console.log(password);
  
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email:username 
    }
    });
    return true;
  } catch (error) {
    console.log(error);
    
    return false;
  }
}
