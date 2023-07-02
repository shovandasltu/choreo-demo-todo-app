// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import TodoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";

const theme = createTheme({
  palette: {
    background: {
      default: "#E7EBF0",
    },
  },
});

function App() {
  const { state, on, requestCustomGrant } = useAuthContext();
  const [isTokenExchangeSuccess, setIsTokenExchangeSuccess] = useState(false);

  useEffect(() => {
    on("sign-in", () => {
      const config = {
        attachToken: false,
        tokenEndpoint: "https://sts.choreo.dev:443/oauth2/token",
        data: {
          client_id: "KvZFDZOL8MOZXDucNyImkmeefiMa",
          grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
          subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
          requested_token_type: "urn:ietf:params:oauth:token-type:jwt",
          scope: "{{scope}}",
          subject_token: "{{token}}",
        },
        id: "apim-token-exchange",
        returnResponse: true,
        returnsSession: true,
        signInRequired: true,
      };
      requestCustomGrant(config)
        .then((response) => {
          console.log(response);
          setIsTokenExchangeSuccess(true);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [on, requestCustomGrant]);

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
        {state.isAuthenticated && isTokenExchangeSuccess ? (
          <TodoListPage />
        ) : (
          <LoginPage
            isLoginProgress={state.isAuthenticated && !isTokenExchangeSuccess}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
