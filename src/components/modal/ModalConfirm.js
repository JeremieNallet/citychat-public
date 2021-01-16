import styled from "styled-components";
import { motion as m } from "framer-motion";

//folders
import { defaultSpring } from "../../utils";
import BtnRect from "../buttons/BtnRect";
import useStore from "../../../lib/store";
import size from "../../utils/size";

const Confirm = ({ onConfirm, msg, title }) => {
    const setPanel = useStore((state) => state.setPanel);
    const panel = useStore((state) => state.panel);

    return (
        <>
            {panel.confirmModal && (
                <ModalConfirmStyle>
                    <Modal
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ ...defaultSpring, damping: 20 }}
                    >
                        <p className="container">
                            <span className="container--title">{title}</span>
                        </p>
                        <p className="container">
                            <span className="container--desc">{msg}</span>
                        </p>
                        <div className="container">
                            <BtnRect
                                onClick={onConfirm}
                                color="theme1"
                                title="Yes, I want to leave"
                            />
                            <BtnRect
                                onClick={() =>
                                    setPanel({ confirmModal: false })
                                }
                                color="theme3"
                                title="Cancel"
                            />
                        </div>
                    </Modal>
                </ModalConfirmStyle>
            )}
        </>
    );
};

export default Confirm;

const ModalConfirmStyle = styled(m.div)`
    height: 100vh;
    width: 100vw;
    position: fixed;

    z-index: 999;
    background: ${({ theme }) => theme.color.backdrop};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: scroll;
`;

const Modal = styled(m.div)`
    margin: 1rem;
    background: white;
    width: 62rem;
    box-shadow: ${({ theme }) => theme.style.shadow2};
    border-radius: 1rem;
    padding: 3rem 4rem 4rem 4rem;
    margin-top: -5rem;
    @media (max-width: ${size.below600}) {
        padding: 2rem;
    }
    .container {
        display: flex;
        @media (max-width: ${size.below600}) {
            flex-direction: column;
            button {
                margin-bottom: 0.5rem;
            }
        }
        button {
            margin-right: 0.5rem;
        }
        &:first-child {
            padding-bottom: 1rem;
            border-bottom: 0.1rem solid ${({ theme }) => theme.color.mat5};
            filter: brightness(97%);
            margin-bottom: 1rem;
        }
        &:nth-child(2) {
            padding: 1rem 0 4rem 0;
        }
        &:last-child {
            display: flex;
            width: 100%;
            justify-content: flex-end;
        }
        &--title {
            font-size: 2rem;
            font-weight: 800;
        }
        &--desc {
            font-weight: 300;
            color: ${({ theme }) => theme.color.mat2};
        }
    }
`;
