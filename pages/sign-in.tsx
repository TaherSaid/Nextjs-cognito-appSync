import type { NextPage } from "next";
import { signIn } from '../src/auth';
import SignIn from '../src/signIn';

const Auth: NextPage = () => {
  return (
    <SignIn signIn={signIn}/>
  )
}

export default Auth