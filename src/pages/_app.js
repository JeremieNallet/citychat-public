import { themeL } from "../styles/theme";
import { GlobalStyle } from "../styles/global";
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={themeL}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
