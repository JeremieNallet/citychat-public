import styled from "styled-components";

//tree
import { truncate } from "../../utils";
import UserCard from "../users/UserCard";
import DropdownLayout from "./DropdownLayout";
import useStore from "../../../lib/store";
import { useFirestoreQuery } from "../../hooks/useFirestoreQuery";
import { firebase, firestore } from "../../../lib/firebaseConfig";
import LoaderBig from "../loaders/LoaderBig";

const DropdownNotifications = () => {
    const setGlobalError = useStore((state) => state.setGlobalError);
    const updateViewport = useStore((state) => state.updateViewport);
    const setWaveModalData = useStore((state) => state.setWaveModalData);
    const user = useStore((state) => state.user);

    const { data, status } = useFirestoreQuery(
        firestore.collection("notifications").where("receiverId", "==", user.id)
    );
    const findUserOnTheMap = (senderCoords) => {
        const { lat: latitude, long: longitude } = senderCoords;
        updateViewport({ latitude, longitude, zoom: 17 });
    };
    const deleteNotification = (id) => {
        firestore.collection("notifications").doc(id).delete();
    };
    const sendAwaveBackAtUser = async (targetUser) => {
        const doc = await firestore
            .collection("notifications")
            .doc(`${user.id}-${targetUser.id}`)
            .get();
        if (!doc.exists) {
            try {
                await firebase
                    .firestore()
                    .collection("notifications")
                    .doc(`${targetUser.senderId}-${user.id}`)
                    .set({
                        type: "wave",
                        senderName: user.name,
                        senderId: user.id,
                        senderCoords: user.coords,
                        receiverId: targetUser.senderId,
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
        <DropdownLayout title="Notification">
            {status === "loading" ? (
                <Container>
                    <LoaderBig />
                </Container>
            ) : status === "success" ? (
                <>
                    {data.map((n) => (
                        <UserCard
                            onClick={() => findUserOnTheMap(n.senderCoords)}
                            img="/misc/wave.svg"
                            primaryAction={() => sendAwaveBackAtUser(n)}
                            secondaryAction={() => deleteNotification(n.id)}
                            key={n.id}
                            name={truncate(n.senderName, 20)}
                            tsp={n.createdAt}
                            style={{ height: "10rem" }}
                        />
                    ))}
                </>
            ) : (
                <div>error</div>
            )}
        </DropdownLayout>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

export default DropdownNotifications;
