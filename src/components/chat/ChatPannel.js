import { useState } from "react";

//tree
import ChatMessage from "./ChatMessage";
import useStore from "../../../lib/store";
import ChatResizable from "./ChatResizable";
import { firebase, firestore } from "../../../lib/firebaseConfig";
import styled from "styled-components";
import LoaderBig from "../loaders/LoaderBig";

const ChatPannel = ({ cityChatMessages }) => {
    const [data, status] = cityChatMessages;
    const [messageValue, setMessageValue] = useState("");
    const user = useStore((state) => state.user);

    const sendMessageToCity = async () => {
        if (messageValue && messageValue.trim().length && user.connected) {
            setMessageValue("");
            try {
                await firestore.collection("citychat").add({
                    message: messageValue,
                    senderName: user.name,
                    place: user.place,
                    senderId: user.id,
                    senderEmoji: user.emoji,
                    createdAt: new Date().toISOString(),
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <ChatResizable
            onSubmit={sendMessageToCity}
            value={messageValue}
            onChange={({ target: { value } }) => setMessageValue(value)}
        >
            {status === "loading" ? (
                <LoaderContainer>
                    <LoaderBig />
                </LoaderContainer>
            ) : status === "success" ? (
                data.map((m) => (
                    <ChatMessage
                        key={m.id}
                        message={m.message}
                        who={user.id === m.senderId ? "user" : "sender"}
                        tsp={m.createdAt}
                        emoji={m.senderEmoji}
                    />
                ))
            ) : (
                <div>error</div>
            )}
        </ChatResizable>
    );
};

const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
`;

export default ChatPannel;
