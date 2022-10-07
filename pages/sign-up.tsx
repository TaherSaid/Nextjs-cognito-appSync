import SignUp from "../src/signUp";
import { signUp, resendConfirmationCode, confirmSignUp } from "../src/auth";

const AuthSignUp = () => {
  return (
    <SignUp
      signUp={signUp}
      resendConfirmationCode={resendConfirmationCode}
      confirmSignUp={confirmSignUp}
    />
  );
};

export default AuthSignUp;
