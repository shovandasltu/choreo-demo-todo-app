// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.

// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";

const client = new QueryClient();

const authConfig = {
  signInRedirectURL: window.config.auth.signInRedirectURL,
  signOutRedirectURL: window.config.auth.signOutRedirectURL,
  clientID: window.config.auth.clientID,
  baseUrl: window.config.auth.baseUrl,
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
