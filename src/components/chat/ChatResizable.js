import styled from "styled-components";
import { Resizable } from "re-resizable";
import { motion as m } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowDownLeft, Send } from "react-feather";

//tree
import { softerSpring } from "../../utils";
import useStore from "../../../lib/store";
import BtnIcon from "../buttons/BtnIcon";
import size from "../../utils/size";

const ChatResizable = ({ children, onSubmit, onChange, value }) => {
    const isMobile = useMediaQuery({ query: `(max-width: ${size.below600})` });
    const user = useStore((state) => state.user);
    const setPanel = useStore((state) => state.setPanel);
    const panel = useStore((state) => state.panel);
    const inputRef = useRef(null);
    const minSize = `${isMobile ? "100%" : 500}`;

    const resizeStyle = {
        position: `${isMobile ? "fixed" : "absolute"}`,
        zIndex: 9,
        bottom: `${isMobile ? "0" : "4rem"}`,
        left: `${isMobile ? "0" : "3rem"}`,
        marginTop: `${isMobile ? "0" : "30rem"}`,
    };

    const _onKeyPress = (e) => {
        const keyCode = e.key || e.which || e.code;
        if (keyCode === "Enter" || keyCode === 13) {
            e.preventDefault();
            onSubmit();
            inputRef.current.blur();
            return false;
        }
    };
    const _onSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        inputRef.current.blur();
    };

    return (
        <>
            {panel.chat && (
                <Resizable
                    minHeight={minSize}
                    minWidth={minSize}
                    maxHeight="85%"
                    maxWidth="85%"
                    resizeRatio="2"
                    style={{ ...resizeStyle }}
                    defaultSize={{
                        width: minSize,
                        height: minSize,
                    }}
                >
                    <ChatResizableStyle
                        transition={softerSpring}
                        initial={{
                            y: `${isMobile ? "20%" : "5%"}`,
                            opacity: 0,
                        }}
                        animate={{ y: "0%", opacity: 1 }}
                    >
                        <nav className="head">
                            <div className="head__content">
                                <div className="dot-indicator" />
                                <span className="location">{user.place}</span>
                            </div>

                            <div className="content">
                                <BtnIcon
                                    color="theme2"
                                    onClick={() => setPanel({ chat: false })}
                                >
                                    <ArrowDownLeft />
                                </BtnIcon>
                            </div>
                        </nav>
                        <div className="messages">
                            <div className="messages__content">{children}</div>
                        </div>
                        <form className="form" onSubmit={_onSubmit}>
                            <div className="form__content">
                                {/* <BtnIcon color="theme3">
                                    <Smile />
                                </BtnIcon> */}
                                <TextAreaAutosize
                                    ref={inputRef}
                                    onKeyPress={_onKeyPress}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Send a message ..."
                                    type="text"
                                />
                                <BtnIcon color="theme3">
                                    <Send />
                                </BtnIcon>
                            </div>
                        </form>
                    </ChatResizableStyle>
                </Resizable>
            )}
        </>
    );
};

export default ChatResizable;

const ChatResizableStyle = styled(m.div)`
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: ${({ theme }) => theme.style.shadow2};
    background: white;
    @media (max-width: ${size.below600}) {
        border-radius: 0rem;
    }

    .head {
        color: white;
        font-size: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        width: 100%;
        height: 4rem;
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;

        background: ${({ theme }) => theme.color.mat1};
        @media (max-width: ${size.below600}) {
            border-radius: 0rem;
        }
        &__content {
            display: flex;
            align-items: center;
            .location {
                font-size: 1.3rem;
            }
            .dot-indicator {
                display: flex;
                margin-right: 1rem;
                background: ${({ theme }) => theme.color.tertiary};
                width: 1rem;
                height: 1rem;
                border-radius: 1rem;
            }
        }
    }
    .messages {
        overflow-y: auto;
        display: flex;
        flex-direction: column-reverse;
        align-items: stretch;
        width: 100%;
        flex: 1;
        &__content {
            width: 100%;
            min-height: 100%;
            padding: 0 1.5rem 0 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
    }
    .form {
        flex: 0 0 10rem;
        width: 100%;
        padding: 2.2rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom-left-radius: 1.5rem;
        border-bottom-right-radius: 1.5rem;

        box-shadow: ${({ theme }) => theme.style.shadow2};

        @media (max-width: ${size.below600}) {
            border-radius: 0rem;
        }

        &__content {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            padding: 0 1rem;

            textarea {
                width: 100%;
                min-height: 3rem;
                padding: 0rem 0rem;
                font-size: 1.6rem;
                margin-right: 1rem;
                margin-top: 0.3rem;
                margin-left: 1rem;
                max-height: 20rem;
                border: none;
                color: ${({ theme }) => theme.color.mat1};
                resize: none;
                ::placeholder {
                    color: ${({ theme }) => theme.color.mat3};
                }
            }
        }
    }
`;
