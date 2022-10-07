import React from "react";
import { Modal, Typography, Input, Button } from "antd";
import { useRouter } from "next/router";
 
interface IConfirmSignUp {
  username: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  codeConfirmation: (username: string, code: string) => Promise<boolean>;
  resendConfirmationCode(
    username: string
  ): Promise<boolean>
}

const { Title } = Typography;

const ConfirmSignUp = ({
  isModalOpen,
  setIsModalOpen,
  codeConfirmation,
  resendConfirmationCode,
  username,
}: IConfirmSignUp) => {
  const [confirmationCode, setConfirmationCode] = React.useState<string>("");
const router=useRouter();
  const onCodeChange = (e: any) => {
    setConfirmationCode(e.target.value);
  };

  const onOk = async()=>{
    const codeConfirmationRes= await codeConfirmation(username, confirmationCode);
    if (codeConfirmationRes) {
        setIsModalOpen(false)
        router.push("/sign-in")
    }
}

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={() => onOk()}
      onCancel={()=>setIsModalOpen(false)}
    >
      <Title level={4}>email verification</Title>
      <Input
        placeholder="set confirmation code"
        allowClear
        onChange={onCodeChange}
      />
      <Button type="link" onClick={() => resendConfirmationCode(username)}>
        Resend code
      </Button>
    </Modal>
  );
};

export default ConfirmSignUp;
