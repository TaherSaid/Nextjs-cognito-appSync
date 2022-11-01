import { GraphQLResult } from "@aws-amplify/api";
import { Button, Form, Input, List, message } from "antd";
import { API } from "aws-amplify";
import * as React from "react";
import { ListTodosQuery } from "../../src/API";
import { createTodo } from "../../src/graphql/mutations";
import { listTodos } from "../../src/graphql/queries";
import styles from "../../styles/app.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import awsConfig from "../../src/aws-exports";

const getListTodo = async () => {
  try {
    const { data } = (await API.graphql({
      query: listTodos,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<ListTodosQuery>;
    return data;
  } catch (error: any) {
    message.error(error);
  }
};

const addTodo = async (todo: any) => {
  try {
    await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createTodo,
      variables: { input: todo },
    });
  } catch (error: any) {
    message.error(error);
  }
};

const Home = () => {
  const [todoList, setTodoList] = React.useState<ListTodosQuery | undefined>(
        
      );
  const { data: session } = useSession();

  console.log(session);
  React.useEffect(() => {
    if (session) {
      const userPool = new CognitoUserPool({
        UserPoolId: awsConfig.aws_user_pools_id,
        ClientId: awsConfig.aws_user_pools_web_client_id,
      });
      const cognitoIdToken = new CognitoIdToken({
        IdToken: session?.user?.name?.signInUserSession?.idToken?.jwtToken,
      });
      const cognitoAccessToken = new CognitoAccessToken({
        AccessToken:
          session?.user?.name?.signInUserSession?.accessToken.jwtToken,
      });
      const cognitoRefreshToken = new CognitoRefreshToken({
        RefreshToken:
          session?.user?.name?.signInUserSession?.refreshToken.token,
      });
      const username = cognitoIdToken.payload.Username;
      const user = new CognitoUser({
        Username: session?.user?.name?.username,
        Pool: userPool,
      });
      user.setSignInUserSession(
        new CognitoUserSession({
          AccessToken: cognitoAccessToken,
          IdToken: cognitoIdToken,
          RefreshToken: cognitoRefreshToken,
        })
      );
    }
  }, [session]);

  React.useEffect(() => {
     getListTodo().then((res)=>setTodoList(res)) 
  }, []);

  const onFinish = (todo:any) => {
    addTodo(todo).then(() => {
      getListTodo().then((todosLists) => {
        setTodoList(todosLists);
      });
    });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>APP</h1>
        <Button type="primary" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>
      </div>
      <div className={styles.formWrapper}>
         <Form onFinish={onFinish} name="todoForm">
           <Form.Item label="Name" name="name">
             <Input placeholder="Todo name" />
           </Form.Item>
           <Form.Item label="Description" name="description">
             <Input placeholder="Todo description" />
           </Form.Item>
           <Form.Item>
             <Button type="primary" htmlType="submit">
               Submit
             </Button>
           </Form.Item>
         </Form>
       </div>
       <div className={styles.listWrapper}>
         <List
           itemLayout="horizontal"
           dataSource={todoList?.listTodos?.items}
           renderItem={(item) => (
             <List.Item>
               <List.Item.Meta
                 title={item?.name}
                 description={item?.description}
               />
             </List.Item>
           )}
         />
       </div>
    </>
  );
};

export default Home;
