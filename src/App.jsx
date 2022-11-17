// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import Stack from "@mui/material/Stack";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#E7EBF0",
    },
  },
});

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    fetchTodoItems();
  }, []);

  const fetchTodoItems = () => {
    fetch("http://ubuntu-vm:8090/todos")
      .then((resp) => resp.json())
      .then((result) => setTodoItems(result))
      .catch((err) => console.log(err));
  };

  const addSuccessHandler = () => {
    console.log("sda");
    fetchTodoItems();
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <CssBaseline enableColorScheme />
      <Container>
        <Stack spacing={2} sx={{ m: 1 }}>
          <Typography variant="h4" align="center">
            Todo List
          </Typography>
          <AddTodo onAddSuccess={addSuccessHandler} />
          <TodoList todoItems={todoItems} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
