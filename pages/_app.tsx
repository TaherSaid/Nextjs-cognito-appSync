import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsConfig from "../src/aws-exports";
import { SessionProvider } from "next-auth/react";

Amplify.configure(awsConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
