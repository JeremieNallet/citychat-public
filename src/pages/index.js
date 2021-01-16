import Head from "next/head";

//components
import Launch from "../components/launch/Launch";
import { scale } from "../../content/head";

const App = () => {
    return (
        <>
            <Head>
                <title>citychat.io</title>
                <meta name="viewport" content={scale} />
            </Head>
            <Launch />
        </>
    );
};

export default App;
