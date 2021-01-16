import React from "react";
import ReactMapGL from "react-map-gl";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

//tree
import { reversedGeoCoding } from "../../utils";
import { firebase, firestore } from "../../../lib/firebaseConfig";
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery";
import useStore from "../../../lib/store";
import size from "../../utils/size";
import DashAddIndicator from "./DashAddIndicator";
import UserMapEmoji from "../users/UserMapEmoji";
import ChatPannel from "../chat/ChatPannel";
import DashBottom from "./DashBottom";
import DashCursor from "./DashCursor";
import DashLoader from "./DashLoader";

const DashMap = ({ connectedUsers, cursor = "grab", scrollZoom = true }) => {
    const launchComplete = useStore((state) => state.launchComplete);
    const isMapLoaded = useStore((state) => state.isMapLoaded);
    const user = useStore((state) => state.user);
    const setPanel = useStore((state) => state.setPanel);
    const setUser = useStore((state) => state.setUser);
    const updateViewport = useStore((state) => state.updateViewport);
    const setNextViewport = useStore((state) => state.setNextViewport);
    const setIsMapLoaded = useStore((state) => state.setIsMapLoaded);
    const viewPortState = useStore((state) => state.viewPortState);
    const setGlobalError = useStore((state) => state.setGlobalError);
    const isMobile = useMediaQuery({ query: `(max-width: ${size.below600})` });

    const { data, status } = useFirestoreQuery(
        user.place &&
            firestore
                .collection("citychat")
                .where("place", "==", user.place)
                .orderBy("createdAt")
                .limitToLast(100)
    );

    //INIT A NEW USER
    const addUserPosition = async ({ lngLat }) => {
        const { place, error } = await reversedGeoCoding(lngLat[0], lngLat[1]);

        if (place && !user.connected) {
            setUser({
                place,
                connected: true,
                isAddingPosition: false,
                coords: { long: lngLat[0], lat: lngLat[1] },
            });
            try {
                const doc = await firestore.collection("positions").add({
                    emoji: user.emoji,
                    name: user.name,
                    createdAt: new Date().toISOString(),
                    coords: new firebase.firestore.GeoPoint(
                        lngLat[1],
                        lngLat[0]
                    ),
                    place: place,
                });
                updateViewport({
                    longitude: lngLat[0],
                    latitude: lngLat[1],
                    zoom: 16,
                });
                setUser({ id: doc.id });
                if (!isMobile) setTimeout(() => setPanel({ chat: true }), 1000);
            } catch (err) {
                setGlobalError(
                    "something went wrong, please verify your internet connection"
                );
            }
        } else if (error) {
            setGlobalError(error);
        }
    };

    return (
        <>
            {launchComplete && (
                <DashMapStyle>
                    <DashCursor />
                    <DashBottom cityChatMessages={[data]} />
                    <ChatPannel cityChatMessages={[data, status]} />

                    <ReactMapGL
                        {...viewPortState}
                        getCursor={() => cursor}
                        attributionControl={false}
                        onClick={addUserPosition}
                        scrollZoom={scrollZoom}
                        width="100%"
                        height="100%"
                        onLoad={() => setIsMapLoaded()}
                        style={{
                            pointerEvents: `${
                                isMapLoaded ? "initial" : "none"
                            }`,
                        }}
                        mapStyle="mapbox://styles/newjerem/ckfb4pavw2ygh19ocjgzg0c0y"
                        onViewportChange={(next) => setNextViewport(next)}
                        mapboxApiAccessToken={process.env.MAPBOX_KEY}
                    >
                        {!isMapLoaded && <DashLoader />}
                        <UserMapEmoji connectedUsers={connectedUsers} />
                        <DashAddIndicator />
                    </ReactMapGL>
                </DashMapStyle>
            )}
        </>
    );
};
export default DashMap;

const DashMapStyle = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;
