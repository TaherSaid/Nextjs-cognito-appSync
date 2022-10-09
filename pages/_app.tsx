import "../styles/globals.css";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsConfig from "../src/aws-exports";

Amplify.configure({ ...awsConfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
