import { useEffect, useState } from "react";
import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function TodoFilter(props) {
  const { state, signOut, getBasicUserInfo } = useAuthContext();
  const [username, setUserName] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await getBasicUserInfo();
      console.log("userResponse", userResponse);
      setUserName(userResponse?.orgName);
    };
    getUser();
  }, []);

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
          {username ? (
            <Typography variant="subtitle1" align="center">
              Logged in as: {username}
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
