import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;

}
html,
body {
    font-family: Poppins;
    font-style: normal;
    color: ${({ theme }) => theme.color.mat1};

}

html {
    font-size: 62.5%;
  
}
body {
    font-size: 1.6rem;
}
a {
    color: inherit;
    text-decoration: none;
}
textarea {
    font-family: Poppins;
}
input,
button {
    height: 6.5rem;
    border-radius: 1rem;
}


.theme-1 {
    color: ${({ theme }) => theme.color.primary};
}

`;
