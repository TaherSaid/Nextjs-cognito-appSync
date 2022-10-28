import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import styles from "./signIn.module.css";

interface ISignIn {
  signIn: any;
  // signIn: (username: string, password: string) => Promise<boolean | undefined>;
}

interface IOnFinish {
  username: string;
  password: string;
}

function SignIn({ signIn }: ISignIn) {
  const router = useRouter();

  const onFinish = async ({ username, password }: IOnFinish) => {
    const signInRe = await signIn(username, password);
    console.log(signInRe);
    
    if (signInRe) {
      router.push("/app/");
    } else {
      message.error("An error occured while signIn");
    }
  };

  return (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign In </h1>
      <Form
        name="basic"
        onFinish={onFinish}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SignIn;
