import { AsgardeoSPAClient } from "@asgardeo/auth-react";

// const spaClient = AsgardeoSPAClient.getInstance();
import { useAuthContext } from "@asgardeo/auth-react";

import { useQuery, useMutation, useQueryClient } from "react-query";

export const getTodos = (showCompleted) => {
  // spaClient
  //   .getAccessToken()
  //   .then((token) => {
  //     console.log(token);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // let url = `${process.env.REACT_APP_API_URL}/todos`;
  // if (!showCompleted) {
  //   url += "?done=false";
  // }
  // return wrappedFetch(url);
};

export const createTodo = (newTodo) => {
  // return fetch(`${process.env.REACT_APP_API_URL}/todos`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": `${process.env.REACT_APP_API_KEY}`,
  //   },
  //   body: JSON.stringify(newTodo),
  // });
};
export const updateTodo = (updatedTodo) => {
  // return fetch(`${process.env.REACT_APP_API_URL}/todos`, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": `${process.env.REACT_APP_API_KEY}`,
  //   },
  //   body: JSON.stringify(updatedTodo),
  // });
};

const wrappedFetch = (input, init) => {
  // return spaClient
  //   .getAccessToken()
  //   .then((token) => {
  //     const initSend = init || {};
  //     initSend.headers = {
  //       ...(init && init.headers),
  //       Authorization: `Bearer ${token}`,
  //     };
  //     return fetch(input, initSend);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

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
  const { getDecodedIDToken, getAccessToken } = useAuthContext();
  return useQuery(["get-todos", showCompleted], async () => {
    const token = await getAccessToken();
    const datatoken = await getDecodedIDToken();
    console.log("------------", token);
    console.log("xs------------", datatoken);
    return fetch(
      "https://ec149f4e-f145-4064-a8ab-e1fc8f0c563f-dev.e1-us-east-azure.choreoapis.dev/rgyo/todo-svc/graphql-todo-aa9/1.0.0/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: showCompleted ? ALL_TODOS_QUERY : REMAINING_TODOS_QUERY,
        }),
      }
    )
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
      console.log("++++++++++++++", token);
      return fetch(
        "https://ec149f4e-f145-4064-a8ab-e1fc8f0c563f-dev.e1-us-east-azure.choreoapis.dev/rgyo/todo-svc/graphql-todo-aa9/1.0.0/",
        {
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
        }
      )
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
      console.log("++++++++++++++", token);
      return fetch(
        "https://ec149f4e-f145-4064-a8ab-e1fc8f0c563f-dev.e1-us-east-azure.choreoapis.dev/rgyo/todo-svc/graphql-todo-aa9/1.0.0/",
        {
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
        }
      )
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
