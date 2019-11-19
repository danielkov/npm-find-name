import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --text-color: #f8f8f8;
  --background-color: rgba(38, 38, 38);
  --placeholder-color: #bbb;
  --input-color: #f8f8f8;
  --content-background-color: rgba(0, 0, 0, 0.3);
}

@media screen and (prefers-color-scheme: light) {
  :root {
    --text-color: rgba(38, 38, 38);
    --background-color: #f8f8f8;
    --placeholder-color: #222;
    --input-color: rgba(38, 38, 38);
    --content-background-color: #f5f5f5;
  }
}

* {
    box-sizing: inherit;
}

body {
  background: var(--background-color);
  color: var(--text-color);
  margin: 0;
  font-family: 'Source Sans Pro', 'Lucida Grande', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  overflow-x: hidden;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
  monospace;
}
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
