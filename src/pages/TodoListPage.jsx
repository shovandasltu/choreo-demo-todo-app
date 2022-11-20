import React, { useEffect, useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import AddTodo from "../components/AddTodo/AddTodo";
import TodoList from "../components/TodoList/TodoList";
import TodoOptions from "../components/TodoOptions/TodoOptions";
import Typography from "@mui/material/Typography";

import { getTodos } from "../apis/todos";

function TodoListPage() {
  const [todoItems, setTodoItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const fetchTodoItems = useCallback(() => {
    getTodos(showCompleted)
      .then((resp) => resp.json())
      .then((result) => setTodoItems(result))
      .catch((err) => console.log(err));
  }, [showCompleted]);

  useEffect(() => {
    fetchTodoItems();
  }, [showCompleted, fetchTodoItems]);

  const addSuccessHandler = () => {
    fetchTodoItems();
  };

  const showCompletedHandler = (event) => {
    setShowCompleted(event.target.checked);
  };

  return (
    <Stack spacing={2} sx={{ m: 1 }}>
      <Typography variant="h4" align="center">
        Todo List
      </Typography>
      <AddTodo onAddSuccess={addSuccessHandler} />
      <TodoOptions
        showCompleted={showCompleted}
        onShowCompletedChange={showCompletedHandler}
      />
      <TodoList todoItems={todoItems} />
    </Stack>
  );
}

export default TodoListPage;
