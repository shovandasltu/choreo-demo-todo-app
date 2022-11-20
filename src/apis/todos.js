import { AsgardeoSPAClient } from "@asgardeo/auth-react";

const spaClient = AsgardeoSPAClient.getInstance();

export const getTodos = (showCompleted) => {
  // spaClient
  //   .getAccessToken()
  //   .then((token) => {
  //     console.log(token);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  let url = `${process.env.REACT_APP_API_URL}/todos`;
  if (!showCompleted) {
    url += "?done=false";
  }
  return wrappedFetch(url);
};

export const createTodo = (newTodo) => {
  return fetch(`${process.env.REACT_APP_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": `${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify(newTodo),
  });
};
export const updateTodo = (updatedTodo) => {
  return fetch(`${process.env.REACT_APP_API_URL}/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": `${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify(updatedTodo),
  });
};

const wrappedFetch = (input, init) => {
  return spaClient
    .getAccessToken()
    .then((token) => {
      const initSend = init || {};
      initSend.headers = {
        ...(init && init.headers),
        Authorization: `Bearer ${token}`,
      };
      return fetch(input, initSend);
    })
    .catch((error) => {
      console.error(error);
    });
};
