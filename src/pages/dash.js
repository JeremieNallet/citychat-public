import Head from "next/head";

//tree
import Dash from "../components/dash/";
import protectedClient from "../hooks/protectedClient";
import useDeletePosOnUnload from "../hooks/useDeletePosOnUnload";
import { scale } from "../../content/head";

const dash = () => {
    protectedClient("/");
    useDeletePosOnUnload();
    return (
        <>
            <Head>
                <title>citychat.io - dashboard</title>
                <meta name="viewport" content={scale} />
            </Head>
            <Dash />
        </>
    );
};

export default dash;
