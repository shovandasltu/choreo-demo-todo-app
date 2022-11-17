import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function AddTodo(props) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    const newTodo = {
      title: inputTitle,
      description: inputDescription,
    };

    fetch("http://ubuntu-vm:8090/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((res) => {
        if (res.status === 200) {
          setInputTitle("");
          setInputDescription("");
          props.onAddSuccess();
        } else {
          console.log("Some error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const titleChangeHandler = (event) => {
    setInputTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  return (
    <Paper>
      <form onSubmit={submitHandler}>
        <Box sx={{ m: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            spacing={2}
          >
            <TextField
              type="text"
              value={inputTitle}
              onChange={titleChangeHandler}
              label="Title"
              size="small"
              sx={{ flex: 2 }}
            />
            <TextField
              type="text"
              value={inputDescription}
              onChange={descriptionChangeHandler}
              label="Description"
              size="small"
              sx={{ flex: 2 }}
            />
            <Button variant="contained" type="submit" sx={{ flex: 1 }}>
              Add Todo
            </Button>
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}

export default AddTodo;
