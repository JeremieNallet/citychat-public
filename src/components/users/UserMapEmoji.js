import styled, { css, keyframes } from "styled-components";
import { useState, Fragment, useRef } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { truncate } from "../../utils";
import useOnClickOutside from "use-onclickoutside";
import { XCircle } from "react-feather";

//foders
import useStore from "../../../lib/store";
import { Marker, Popup } from "react-map-gl";
import { defaultSpring, softerSpring } from "../../utils";
import DashLoader from "../dash/DashLoader";
import { Hand } from "../../../assets/svgs";
import { firestore } from "../../../lib/firebaseConfig";

const UserMapEmoji = ({ connectedUsers }) => {
    const [data, status] = connectedUsers;
    const [userIdHovered, setUserIdHovered] = useState();
    const [showPopup, setShowPopup] = useState({});
    const markerRef = useRef(null);
    const user = useStore((state) => state.user);
    const setGlobalError = useStore((state) => state.setGlobalError);
    const setWaveModalData = useStore((state) => state.setWaveModalData);
    useOnClickOutside(markerRef, () => setShowPopup({}));

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

    return (
        <>
            {user.connected && (
                <>
                    {status === "loading" ? (
                        <DashLoader transparent />
                    ) : status === "success" ? (
                        data.map((el) => {
                            const myEmoji = el.id === user.id;
                            const popupId = Object.keys(showPopup)[0];
                            const scale =
                                userIdHovered === el.id
                                    ? 1.3
                                    : popupId === el.id
                                    ? 1.3
                                    : 1;
                            return (
                                <Fragment key={el.id}>
                                    <Marker
                                        latitude={el.coords.w_}
                                        longitude={el.coords.E_}
                                    >
                                        <UserEmoji
                                            onHoverStart={() =>
                                                setUserIdHovered(el.id)
                                            }
                                            onHoverEnd={() =>
                                                setUserIdHovered(null)
                                            }
                                            transition={{
                                                ...defaultSpring,
                                                damping: 20,
                                            }}
                                            animate={{ scale }}
                                            myEmoji={myEmoji}
                                        >
                                            <Img
                                                onClick={() =>
                                                    setShowPopup({
                                                        [el.id]: true,
                                                    })
                                                }
                                                src={`/images/emojis/${el.emoji}`}
                                                alt="user"
                                            />
                                        </UserEmoji>
                                    </Marker>
                                    <AnimatePresence>
                                        {showPopup[el.id] && (
                                            <PopupWraper
                                                ref={markerRef}
                                                transition={softerSpring}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 10, opacity: 0 }}
                                            >
                                                <Popup
                                                    style={{
                                                        boxShadow: "none",
                                                    }}
                                                    className="popup"
                                                    closeButton={false}
                                                    closeOnClick={true}
                                                    latitude={el.coords.w_}
                                                    longitude={el.coords.E_}
                                                >
                                                    <MenuPanel
                                                        whileHover={{
                                                            scale: 1.045,
                                                        }}
                                                        transition={
                                                            softerSpring
                                                        }
                                                        onClick={() =>
                                                            sendWaveToUser(el)
                                                        }
                                                    >
                                                        <div className="icon">
                                                            <Hand className="icon--svg" />
                                                        </div>
                                                        Wave your hand
                                                    </MenuPanel>
                                                    <div className="top">
                                                        <span>
                                                            {truncate(
                                                                el.name,
                                                                18
                                                            )}
                                                        </span>
                                                        <XCircle
                                                            className="close"
                                                            onClick={() =>
                                                                setShowPopup({})
                                                            }
                                                        />
                                                    </div>
                                                </Popup>
                                            </PopupWraper>
                                        )}
                                    </AnimatePresence>
                                </Fragment>
                            );
                        })
                    ) : (
                        <div>something went wrong</div>
                    )}
                </>
            )}
        </>
    );
};

export default UserMapEmoji;

const pulse = keyframes`
    0% {
        opacity: 0.3;
    
        transform: translate(-50%, -50%) scale(0.5) translateZ(-10px);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.5) translateZ(-10px);
    }
`;

const MenuPanel = styled(m.div)`
    margin: 1rem;
    padding: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    font-size: 1.4rem;
    width: 100%;
    color: ${({ theme }) => theme.color.mat1};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.style.shadow1};
    font-size: 1.3rem;
    font-weight: 500;

    .icon {
        margin-right: 0.5rem;
        width: 3.5rem;
        height: 3.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10rem;

        svg {
            stroke: ${({ theme }) => theme.color.mat1};
            stroke-width: 1;
            transform: scale(1.1);
        }
    }
`;

const PopupWraper = styled(m.div)`
    z-index: 99999;
    position: relative;

    .mapboxgl-popup {
        padding: 4.5rem 3rem 1rem 3rem;
    }

    .mapboxgl-popup-content {
        cursor: initial;
        position: relative;
        width: 26rem;
        padding: 3.5rem 0.5rem 2rem 0.5rem;
        display: flex;
        align-items: center;
        justify-content: stretch;
        border-radius: 1.5rem;
        box-shadow: ${({ theme }) => theme.style.shadow2};

        .top {
            margin: 0.2rem;
            position: absolute;
            top: 0.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            font-size: 1.4rem;
            padding: 0.4rem 2rem 0 1.5rem;
            span {
                display: flex;
                align-items: center;
                .name {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
            .close {
                cursor: pointer;
                width: 1.8rem;
                height: 1.8rem;

                :hover {
                    opacity: 0.5;
                }
            }
        }
    }
`;

const UserEmoji = styled(m.div)`
    position: relative;
    z-index: 1;
    width: 3.5rem;
    height: 3.5rem;
    left: -50%;
    top: -50%;
    transition: translate(-50%, -50%);
    border-radius: 20rem;
    box-shadow: ${({ theme }) => theme.style.shadow3};
    cursor: pointer;
    ${({ myEmoji }) => {
        if (myEmoji) {
            return css`
                cursor: grab;
                pointer-events: none;
            `;
        }
    }}

    ${(props) => {
        if (props.myEmoji) {
            return css`
                :after {
                    content: "";
                    top: 50%;
                    left: 50%;
                    animation: ${pulse} 1.5s infinite;
                    transform: translate(-50%, -50%);
                    background: ${({ theme }) => theme.color.primary};
                    position: absolute;
                    border-radius: 100%;
                    z-index: -1;
                    opacity: 0.15;
                    display: flex;
                    width: 10rem;
                    height: 10rem;
                }
            `;
        }
    }}
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border: 0.4rem solid white;
    border-radius: 100%;
`;
