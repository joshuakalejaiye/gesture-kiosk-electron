import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button:focus {
        outline: 0;
        //box-shadow: 0 0 0 2pt grey;
    }

    :root {
      font-size: 16px;
      overflow: hidden;
    }

    html, body {
        height: 100%;
    }

`;
