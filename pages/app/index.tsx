import { Button, Form, Input, List, message } from "antd";
import { API, withSSRContext } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { ListTodosQuery } from "../../src/API";
import { signOut } from "../../src/auth";
import { createTodo } from "../../src/graphql/mutations";
import { listTodos } from "../../src/graphql/queries";
import styles from "../../styles/app.module.css";

interface ITodo {
  name: string;
  description: string;
}

interface IProps {
  email: string;
  todoListItems?: ListTodosQuery;
}

interface IGetServerSideProps {
  props: IProps;
}

const addTodo = async (todo: ITodo) => {
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

export async function getServerSideProps({
  req,
}: {
  req: GetServerSidePropsContext;
}): Promise<IGetServerSideProps> {
  const SSR = withSSRContext({ req });
  const currentSession = await SSR.Auth.currentSession();
  const { email } = currentSession.idToken.payload;
  const { data } = (await SSR.API.graphql({
    query: listTodos,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListTodosQuery>;

  return {
    props: { email, todoListItems: data },
  };
}

const Home = ({ email, todoListItems }: IProps) => {
  const [todoList, setTodoList] = React.useState<ListTodosQuery | undefined>(
    todoListItems
  );

  const router = useRouter();

  const onFinish = (todo: ITodo) => {
    addTodo(todo).then(() => {
      getListTodo().then((todosLists) => {
        setTodoList(todosLists);
      });
    });
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Welcome : {email}</h1>
        <Button type="primary" onClick={() => signOut(router)}>
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
