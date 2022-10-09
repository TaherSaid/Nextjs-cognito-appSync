import { Auth } from "aws-amplify";
import { NextRouter } from "next/router";
import { message } from "antd";

export async function signOut(router: NextRouter) {
  try {
    await Auth.signOut();
    router.push("/");
  } catch (error: any) {
    message.error("Error signing out: ", error);
  }
}
