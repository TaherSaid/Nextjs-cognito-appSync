import type { NextPage } from "next";
import { confirmSignUp, resendConfirmationCode, signUp } from "../src/auth";
import SignUp from "../src/signUp";

const AuthSignUp: NextPage = () => {
  return (
    <SignUp
      signUp={signUp}
      resendConfirmationCode={resendConfirmationCode}
      confirmSignUp={confirmSignUp}
    />
  );
};

export default AuthSignUp;
