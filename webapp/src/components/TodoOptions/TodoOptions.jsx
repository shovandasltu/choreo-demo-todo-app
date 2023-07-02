import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function TodoFilter(props) {
  const { state, signOut } = useAuthContext();
  return (
    <Paper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ m: 2 }}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1" align="center">
            Show Completed
          </Typography>
          <Switch
            checked={props.showCompleted}
            onChange={props.onShowCompletedChange}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          {state.displayName ? (
            <Typography variant="subtitle1" align="center">
              Logged in as: {state.displayName}
            </Typography>
          ) : null}

          <Button variant="contained" onClick={() => signOut()}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TodoFilter;
