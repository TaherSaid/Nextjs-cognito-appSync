import { withSSRContext } from "aws-amplify";
import { GetServerSidePropsContext } from "next";
import { Button, message } from "antd";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

interface IProps {
  email: string;
  email_verified: boolean;
}

interface IGetServerSideProps {
  props: IProps;
}

export async function getServerSideProps({
  req,
}: {
  req: GetServerSidePropsContext;
}): Promise<IGetServerSideProps> {
  const SSR = withSSRContext({ req });
  const currentSession = await SSR.Auth.currentSession();
  const { email, email_verified } = currentSession.idToken.payload;
  return { props: { email, email_verified } };
}

const Home = ({ email, email_verified }: IProps) => {
  const router = useRouter();
  async function signOut() {
    try {
      await Auth.signOut();
      router.push("/");
    } catch (error:any) {
      message.error("Error signing out: ", error);
    }
  }

  return (
    <div>
      <h1>Welcome {email}</h1>
      <h2>
        Email verified : {email_verified ? "confirmed " : " not confirmed"}
      </h2>
      <Button type="primary" onClick={signOut}>Logout</Button>
    </div>
  );
};

export default Home;
