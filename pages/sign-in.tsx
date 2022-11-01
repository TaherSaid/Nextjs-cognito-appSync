import type { NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import SignIn from "../src/signIn";

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  const result = session
    ? {
        redirect: {
          destination: "/app",
          permanent: false,
        },
      }
    : {
        props: {},
      };

  return result;
}

const Auth: NextPage = () => {
  const router = useRouter();
  const handleSubmit = async (values: { email: string; password: string }) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const res = await signIn("credentials", { ...data, redirect: false });
    if (res && res.ok) {
      console.log("res",res);
      router.push("/app");
    } else {
      console.log(res);
    }
  };
  return <SignIn signIn={handleSubmit} />;
};

export default Auth;
