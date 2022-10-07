import React from "react";
import { Button, Form, Input, message } from "antd";
import ConfirmSignUp from "../confirmSignUp";
import { confirmSignUp, resendConfirmationCode } from "../auth";
import styles from "./signIn.module.css";

interface IUser {
  username: string;
  password: string;
}

interface ISignUp {
  signUp: (username: string, password: string) => Promise<boolean | undefined>;
  resendConfirmationCode: (username: string) => Promise<boolean>;
  confirmSignUp: (username: string, code: string) => Promise<boolean>;
}

const SignUp = ({ signUp }: ISignUp) => {
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState<IUser>();

  const onFinish = async (user: IUser) => {
    const signUpRe = await signUp(user.username, user.password);
    setUser(user);
    if (signUpRe) {
      setVisible(true);
    } else {
      message.error("An error occured while signIn");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>SignUp </h1>
      <Form
        name="SignUp Form"
        onFinish={onFinish}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        className={styles.wrapper}
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
      <ConfirmSignUp
        codeConfirmation={confirmSignUp}
        isModalOpen={visible}
        resendConfirmationCode={resendConfirmationCode}
        setIsModalOpen={setVisible}
        username={user ? user?.username : ""}
      />
    </div>
  );
};

export default SignUp;
