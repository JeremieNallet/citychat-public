import styled from "styled-components";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";

//folders
import useStore from "../../../lib/store";
import BtnSquare from "../buttons/BtnSquare";
import DropdownNotifications from "../dropdown/DropdownNotifications";
import useClickOutside from "use-onclickoutside";
import size from "../../utils/size";
import { Bell, ChevronsRight, LogOut } from "react-feather";
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery";
import { firestore } from "../../../lib/firebaseConfig";

const DashNav = () => {
    const notificationRef = useRef(null);
    const setPanel = useStore((state) => state.setPanel);
    const panel = useStore((state) => state.panel);
    const user = useStore((state) => state.user);
    useClickOutside(notificationRef, () => setPanel({ notification: false }));

    const { data } = useFirestoreQuery(
        firestore.collection("notifications").where("receiverId", "==", user.id)
    );

    return (
        <>
            {user.connected && (
                <DashNavStyle>
                    <div className="container">
                        {!panel.side && (
                            <BtnSquare
                                style={{ marginRight: "0.5rem" }}
                                onClick={() => setPanel({ side: true })}
                            >
                                <ChevronsRight />
                            </BtnSquare>
                        )}
                    </div>
                    <div className="container">
                        <div ref={notificationRef}>
                            <BtnSquare
                                notificationCount={data && data.length}
                                onClick={() =>
                                    setPanel({
                                        notification: !panel.notification,
                                    })
                                }
                                style={{ marginRight: "0.5rem" }}
                            >
                                <Bell />
                            </BtnSquare>
                            <AnimatePresence exitBeforeEnter={true}>
                                {panel.notification && (
                                    <DropdownNotifications />
                                )}
                            </AnimatePresence>
                        </div>
                        <BtnSquare
                            style={{ marginRight: "0.5rem" }}
                            onClick={() => setPanel({ confirmModal: true })}
                        >
                            <LogOut />
                        </BtnSquare>
                    </div>
                </DashNavStyle>
            )}
        </>
    );
};

export default DashNav;

const DashNavStyle = styled.nav`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    width: 100%;
    padding: 0 3rem;
    height: 8rem;
    z-index: 1;
    right: 0;
    top: 0;
    pointer-events: none;
    @media (max-width: ${size.below600}) {
        padding: 0 1rem;
    }
    .container {
        display: flex;
        position: relative;
        pointer-events: initial;
    }
`;
