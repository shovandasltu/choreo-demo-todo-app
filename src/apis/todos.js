export const getTodos = (showCompleted) => {
  let url = `${process.env.REACT_APP_API_URL}/todos`;
  if (!showCompleted) {
    url += "?done=false";
  }
  return fetch(url, {
    headers: { "API-Key": `${process.env.REACT_APP_API_KEY}` },
  });
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
