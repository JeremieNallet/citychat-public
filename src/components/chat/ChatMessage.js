import styled, { css } from "styled-components";

//tree
import { timeFromNow } from "../../utils";

const ChatMessage = ({ who, message, tsp, emoji }) => (
    <ChatMessageStyle who={who}>
        <div className="container">
            <div className="content">
                {who === "sender" && (
                    <img
                        className="content__img"
                        src={`/images/emojis/${emoji}`}
                    />
                )}
                <p className="content__message">{message}</p>
            </div>
            <small className="tsp">{timeFromNow(tsp)}</small>
        </div>
    </ChatMessageStyle>
);

const ChatMessageStyle = styled.div`
    display: flex;
    flex-shrink: 0;
    justify-content: ${({ who }) => {
        return who === "sender" ? "flex-start" : "flex-end";
    }};
    :not(:last-child) {
        margin-bottom: 1.4rem;
    }
    :first-child {
        padding-top: 1rem;
    }
    .container {
        align-items: ${({ who }) => {
            return who === "sender" ? "flex-start" : "flex-end";
        }};
        display: flex;
        flex-direction: column;
        .content {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            &__img {
                width: 3.5rem;
                height: 3.5rem;
                margin-right: 1rem;
            }
            &__message {
                padding: 1.1rem 2rem;
                font-size: 1.5rem;

                border-radius: 2rem;
                ${({ who, theme }) => {
                    if (who === "sender") {
                        return css`
                            background: ${theme.color.mat4};
                        `;
                    }
                    if (who !== "sender") {
                        return css`
                            background: ${theme.color.primary};
                            color: white;
                        `;
                    }
                }}
            }
        }
        .tsp {
            font-size: 1.2rem;
            color: ${({ theme }) => theme.color.mat3};
            margin: 0.5rem;
        }
    }
`;

export default ChatMessage;
