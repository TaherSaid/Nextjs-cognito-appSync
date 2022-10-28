import { GraphQLResult } from "@aws-amplify/api";
import { Button, Form, Input, List, message } from "antd";
import { API } from "aws-amplify";
import { useSession } from "next-auth/client";
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
  todoListItems?: ListTodosQuery;
}

const addTodo = async (todo: ITodo, user: string) => {
  try {
    await API.graphql({
      query: createTodo,
      variables: {
        input: {
          name: todo.name,
          description: todo.description,
          userId: user,
        },
      },
    });
  } catch (error: any) {
    message.error(error);
  }
};

const getListTodo = async (email: string) => {
  try {
    const { data } = (await API.graphql({
      query: listTodos,
      variables: { filter: { userId: { eq: email } } },
    })) as GraphQLResult<ListTodosQuery>;
    return data;
  } catch (error: any) {
    message.error(error);
  }
};

const Home = ({ todoListItems }: IProps) => {
  const [session] = useSession();
  const router = useRouter();
  const [todoList, setTodoList] = React.useState<ListTodosQuery | undefined>(
    todoListItems
  );
  const email = session?.user?.name;

  React.useEffect(() => {
    if (email) {
      getListTodo(email).then((todosLists) => {
        setTodoList(todosLists);
      });
    }
  }, [email]);

  const onFinish = (todo: ITodo) => {
    if (email) {
      addTodo(todo, session?.user?.email as string).then(() => {
        getListTodo(email).then((todosLists) => {
          setTodoList(todosLists);
        });
      });
    }
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
