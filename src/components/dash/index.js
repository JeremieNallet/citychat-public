import { AnimatePresence } from "framer-motion";
import FixMobileHeight from "react-div-100vh";

//tree
import useStore from "../../../lib/store";
import DashNav from "./DashNav";
import DashMap from "./DashMap";
import ModalConfirm from "../modal/ModalConfirm";
import DashSidePannel from "./DashSidePannel";
import ModalError from "../modal/ModalError";
import ModalSuccess from "../modal/ModalSuccess";
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery";
import { firestore } from "../../../lib/firebaseConfig";
import { closeMessage } from "../../../content/site";

const Dashboard = () => {
    const panel = useStore((state) => state.panel);
    const waveModalData = useStore((state) => state.waveModalData);
    const setGlobalError = useStore((state) => state.setGlobalError);
    const user = useStore((state) => state.user);

    const { data, status } = useFirestoreQuery(
        user.place &&
            firestore.collection("positions").where("place", "==", user.place)
    );

    const _onConfirm = () => {
        const errorMessage = "Something went wrong.";
        if (typeof window !== "undefined") {
            try {
                firestore.collection("positions").doc(user.id).delete();
                window.location.reload();
            } catch (err) {
                setGlobalError(errorMessage);
            }
        } else setGlobalError(errorMessage);
    };

    return (
        <>
            <AnimatePresence>
                {waveModalData.state && <ModalSuccess />}
            </AnimatePresence>
            <ModalError />
            <FixMobileHeight style={FixMobileHeightStyle}>
                <DashSidePannel connectedUsers={[data, status]} />
                <section style={MainContentStyle}>
                    <DashNav />
                    <DashMap connectedUsers={[data, status]} />
                </section>
                <AnimatePresence>
                    {panel.confirmModal && (
                        <ModalConfirm
                            title="Leave ?"
                            msg={closeMessage}
                            onConfirm={_onConfirm}
                        />
                    )}
                </AnimatePresence>
            </FixMobileHeight>
        </>
    );
};

export default Dashboard;

const FixMobileHeightStyle = {
    display: "flex",
    height: "100vh",
    overflowX: "hidden",
};

const MainContentStyle = {
    position: "relative",
    flex: 1,
};
