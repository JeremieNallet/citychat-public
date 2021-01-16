import styled from "styled-components";
import { useEffect } from "react";

//folders
import { truncate } from "../../utils";
import { useMediaQuery } from "react-responsive";
import { firestore } from "../../../lib/firebaseConfig";
import UserCard from "../users/UserCard";
import useStore from "../../../lib/store";
import DashSideSkeleton from "./DashSideSkeleton";
import DashSideHeader from "./DashSideHeader";
import size from "../../utils/size";
import LoaderBig from "../loaders/LoaderBig";

const DashSidePanel = ({ connectedUsers }) => {
    const [data, status] = connectedUsers;
    const panel = useStore((state) => state.panel);
    const setPanel = useStore((state) => state.setPanel);
    const user = useStore((state) => state.user);
    const setGlobalError = useStore((state) => state.setGlobalError);
    const updateViewport = useStore((state) => state.updateViewport);
    const setWaveModalData = useStore((state) => state.setWaveModalData);

    const hideSideOnSmallScreen = useMediaQuery({
        query: `(max-width: ${size.below930})`,
    });

    const sendWaveToUser = async (targetUser) => {
        const doc = await firestore
            .collection("notifications")
            .doc(`${user.id}-${targetUser.id}`)
            .get();
        if (!doc.exists) {
            try {
                firestore
                    .collection("notifications")
                    .doc(`${user.id}-${targetUser.id}`)
                    .set({
                        type: "wave",
                        senderName: user.name,
                        senderId: user.id,
                        senderCoords: user.coords,
                        receiverId: targetUser.id,
                        createdAt: new Date().toISOString(),
                    });
                setWaveModalData(true, targetUser.name);
            } catch (err) {
                console.log(err);
            }
        } else {
            setGlobalError(
                "Hm, it seems that you already waved at this person."
            );
        }
    };

    const revealUserOnTheMap = ({ w_: latitude, E_: longitude }) => {
        updateViewport({ latitude, longitude, zoom: 17 });
    };

    useEffect(() => {
        setPanel({ side: !hideSideOnSmallScreen });
    }, [hideSideOnSmallScreen, setPanel]);

    return (
        <>
            {panel.side && (
                <DashSidePanelStyle scrollEnabled={user.connected}>
                    <DashSideHeader />
                    <div className="inner-content">
                        <h2 className="inner-content__title">
                            {!user.connected && (
                                <>
                                    <span className="theme-1">
                                        Pin your position
                                    </span>{" "}
                                    to see others !
                                </>
                            )}
                            {data && data.length === 1 && (
                                <>
                                    Huh, it&apos;s a
                                    <span className="theme-1"> ghost town</span>
                                    , sorry.
                                </>
                            )}
                            {data && data.length > 1 && (
                                <>
                                    <span className="theme-1">
                                        {data.length} people
                                    </span>{" "}
                                    here, awesome !
                                </>
                            )}
                        </h2>
                        {!user.connected ? (
                            <DashSideSkeleton />
                        ) : (
                            <>
                                {status === "loading" ? (
                                    <div className="loader-container">
                                        <LoaderBig />
                                    </div>
                                ) : status === "success" ? (
                                    data.map((u) => {
                                        return (
                                            <UserCard
                                                me={u.id === user.id}
                                                img={`/emojis/${u.emoji}`}
                                                key={u.id}
                                                name={truncate(u.name, 24)}
                                                joined={u.createdAt}
                                                onClick={() =>
                                                    revealUserOnTheMap(u.coords)
                                                }
                                                primaryAction={() =>
                                                    sendWaveToUser(u)
                                                }
                                            />
                                        );
                                    })
                                ) : (
                                    <div>error</div>
                                )}
                            </>
                        )}
                    </div>
                </DashSidePanelStyle>
            )}
        </>
    );
};

const DashSidePanelStyle = styled.aside`
    position: relative;
    z-index: 2;
    flex: 0 0 43rem;
    background: white;
    box-shadow: ${({ theme }) => theme.style.shadow2};

    overflow: hidden;
    @media (max-width: ${size.below930}) {
        flex: 100vw;
    }
    .inner-content {
        padding: 1rem 2rem 15rem 2rem;
        height: 100%;
        overflow-y: auto;
        overflow-y: ${({ scrollEnabled }) =>
            scrollEnabled ? "auto" : "hidden"};
        @media (max-width: ${size.below600}) {
            padding: 1rem 1rem 15rem 1rem;
        }
        &__title {
            font-size: 1.78rem;
            font-weight: 700;
            margin: 4rem 0rem 2rem 0.5rem;
        }
    }
    .loading-container {
        height: fit-content;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5vh;
    }
`;

export default DashSidePanel;
