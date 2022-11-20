import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

function TodoFilter(props) {
  return (
    <Paper>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle1" align="center" sx={{ ml: 2 }}>
          Show Completed
        </Typography>
        <Switch
          checked={props.showCompleted}
          onChange={props.onShowCompletedChange}
        />
      </Stack>
    </Paper>
  );
}

export default TodoFilter;
