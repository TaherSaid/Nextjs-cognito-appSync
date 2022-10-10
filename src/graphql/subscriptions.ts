/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($userId: String) {
    onCreateTodo(userId: $userId) {
      id
      name
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($userId: String) {
    onUpdateTodo(userId: $userId) {
      id
      name
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($userId: String) {
    onDeleteTodo(userId: $userId) {
      id
      name
      description
      userId
      createdAt
      updatedAt
    }
  }
`;
