import { AsgardeoSPAClient } from "@asgardeo/auth-react";

import { useAuthContext } from "@asgardeo/auth-react";

import { useQuery, useMutation, useQueryClient } from "react-query";

const REMAINING_TODOS_QUERY = `
  {
    allTodos(done: false) {
      title
      id
      done
      description
    }
  }
`;

const ALL_TODOS_QUERY = `
  {
    allTodos {
      title
      id
      done
      description
    }
  }
`;

export const useGetTodos = (showCompleted) => {
  const { getAccessToken } = useAuthContext();
  return useQuery(["get-todos", showCompleted], async () => {
    const token = await getAccessToken();
    return fetch(window.config.todoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: showCompleted ? ALL_TODOS_QUERY : REMAINING_TODOS_QUERY,
      }),
    })
      .then((response) => {
        if (response.status >= 400) {
          response.json().then((data) => console.log(data));
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((data) => data.data);
  });
};

const CREATE_TODO_MUTATION = `
  mutation ($title: String!, $description: String!){
    createTodo(todoInput: {title: $title, description: $description}) {
      id
      title
      done
      description
    }
  }
`;

export const useCreateTodo = () => {
  const { getAccessToken } = useAuthContext();
  const queryClient = useQueryClient();
  return useMutation(
    async (newTodo) => {
      const token = await getAccessToken();
      return fetch(window.config.todoApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: CREATE_TODO_MUTATION,
          variables: {
            title: newTodo.title,
            description: newTodo.description,
          },
        }),
      })
        .then((response) => {
          if (response.status >= 400) {
            response.json().then((data) => console.log(data));
            throw new Error("Error fetching data");
          } else {
            return response.json();
          }
        })
        .then((data) => data.data);
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("get-todos");
      },
    }
  );
};

const DONE_TODO_MUTATION = `
  mutation ($id: Int!, $done: Boolean!){
    setDone(done: $done, id: $id) {
      description
      done
      id
      title
    }
  }
`;

export const useDoneTodo = () => {
  const { getAccessToken } = useAuthContext();
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedTodo) => {
      const token = await getAccessToken();
      return fetch(window.config.todoApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: DONE_TODO_MUTATION,
          variables: {
            id: updatedTodo.id,
            done: updatedTodo.done,
          },
        }),
      })
        .then((response) => {
          if (response.status >= 400) {
            response.json().then((data) => console.log(data));
            throw new Error("Error fetching data");
          } else {
            return response.json();
          }
        })
        .then((data) => data.data);
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("get-todos");
      },
    }
  );
};
