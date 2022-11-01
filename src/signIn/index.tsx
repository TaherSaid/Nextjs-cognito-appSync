import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import styles from "./signIn.module.css";

interface ISignIn {
  signIn: (values: { email: string; password: string }) => void;
}


function SignIn({ signIn }: ISignIn) {

  const onFinish = async (values: { email: string; password: string }) => {
      await signIn(values)
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
          label="email"
          name="email"
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
