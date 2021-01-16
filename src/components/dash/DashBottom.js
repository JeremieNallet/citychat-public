import React from "react";
import styled from "styled-components";

//folders
import BtnSquare from "../buttons/BtnSquare";
import { MessageSquare, Plus, Minus } from "react-feather";
import useStore from "../../../lib/store";
import size from "../../utils/size";

const DashBottom = ({ cityChatMessages }) => {
    const [data] = cityChatMessages;
    const user = useStore((state) => state.user);
    const setPanel = useStore((state) => state.setPanel);
    const updateViewport = useStore((state) => state.updateViewport);
    const viewPortState = useStore((state) => state.viewPortState);

    const zoomIn = () => updateViewport({ zoom: viewPortState.zoom + 0.5 });
    const zoomOut = () => updateViewport({ zoom: viewPortState.zoom - 0.5 });

    return (
        <>
            {user.connected && (
                <DashBottomStyle>
                    <div>
                        <BtnSquare
                            notificationCount={data && data.length}
                            onClick={() => setPanel({ chat: true })}
                        >
                            <MessageSquare />
                        </BtnSquare>
                    </div>
                    <div>
                        <BtnSquare
                            onClick={zoomIn}
                            style={{ marginBottom: ".5rem" }}
                        >
                            <Plus />
                        </BtnSquare>
                        <BtnSquare onClick={zoomOut}>
                            <Minus />
                        </BtnSquare>
                    </div>
                </DashBottomStyle>
            )}
        </>
    );
};

export default React.memo(DashBottom);

const DashBottomStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;

    padding: 4.5rem 3rem;
    @media (max-width: ${size.below600}) {
        padding: 3rem 1rem;
    }
`;
