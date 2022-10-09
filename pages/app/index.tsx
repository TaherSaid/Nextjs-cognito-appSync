import { Button, Form, Input, List } from "antd";
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
  todoListItem?: ListTodosQuery;
}

interface IGetServerSideProps {
  props: IProps;
}

const addTodo = async (todo: ITodo) => {
  try {
    const data = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createTodo,
      variables: { input: todo },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getListTodo = async () => {
  const { data } = (await API.graphql({
    query: listTodos,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListTodosQuery>;

  return data;
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
    props: { email, todoListItem: data },
  };
}

const Home = ({ email, todoListItem }: IProps) => {
  const [todoList, setTodoList] = React.useState<ListTodosQuery | undefined>(
    todoListItem
  );
  const [reload, setReload] = React.useState<boolean>(false);

  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (todo: ITodo) => {
    addTodo(todo);
    setReload(!reload);
  };

  React.useEffect(() => {
    getListTodo().then((todosLists) => {
      setTodoList(todosLists);
    });
  }, [reload]);

  return (
    <>
      <div className={styles.header}>
        <h1>Welcome : {email}</h1>
        <Button type="primary" onClick={() => signOut(router)}>
          Logout
        </Button>
      </div>
      <div className={styles.formWrapper}>
        <Form form={form} onFinish={onFinish} name="todoForm">
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
