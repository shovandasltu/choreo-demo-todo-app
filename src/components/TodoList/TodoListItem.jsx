import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
function TodoListItem(props) {
  const [done, setDone] = useState(props.done);

  const handleDone = (event) => {
    const doneState = event.target.checked;
    const updatedTodo = {
      id: props.id,
      title: props.title,
      description: props.description,
      done: doneState,
    };
    fetch("http://ubuntu-vm:8090/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    })
      .then((res) => {
        if (res.status === 200) {
          setDone(doneState);
        } else {
          console.log("Some error occured");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <ListItem>
        <Checkbox checked={done} onChange={handleDone} />
        <ListItemText primary={props.title} secondary={props.description} />
      </ListItem>
      {props.divider ? <Divider /> : null}
    </Box>
  );
}

export default TodoListItem;
