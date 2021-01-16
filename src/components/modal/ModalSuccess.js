import styled from "styled-components";
import { motion as m } from "framer-motion";

//folders
import { defaultSpring } from "../../utils/index";
import { useEffect } from "react";
import useStore from "../../../lib/store";

const SuccessWave = () => {
    const waveModalData = useStore((state) => state.waveModalData);
    const setWaveModalData = useStore((state) => state.setWaveModalData);

    const transition = {
        type: "tween",
        duration: 0.4,
        ease: [0.7, 0.01, 0.77, 0.65],
    };
    useEffect(() => {
        let timeout = null;
        timeout = setTimeout(() => {
            setWaveModalData(false, waveModalData.user);
        }, 2100);

        return () => {
            clearTimeout(timeout);
        };
    }, [setWaveModalData, waveModalData.user]);

    return (
        <ModalSuccessStyle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: defaultSpring }}
            exit={{
                opacity: 0,
                transition,
            }}
        >
            <Modal
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: defaultSpring,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.7,
                    transition,
                }}
            >
                <m.div
                    initial={{ rotate: -100, scale: 0.5 }}
                    animate={{
                        scale: 1,
                        rotate: 0,
                        transition: {
                            ...defaultSpring,
                            stiffness: 200,
                            damping: 15,
                            mass: 1.5,
                        },
                    }}
                    exit={{
                        scale: 1,
                        rotate: 0,
                        transition,
                    }}
                    className="img-container"
                >
                    <img
                        className="img"
                        src="/images/misc/wave.svg"
                        alt="wavy hands"
                    />
                </m.div>
                <p>
                    you waved at{" "}
                    <span className="theme-1">{waveModalData.user}</span>
                </p>
            </Modal>
        </ModalSuccessStyle>
    );
};

const Modal = styled(m.div)`
    padding: 5rem;
    border-radius: 2rem;
    width: 35rem;
    background: white;
    box-shadow: ${({ theme }) => theme.style.shadow2};
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    text-align: center;

    .img-container {
        width: 6rem;
        height: 6rem;
        transform-origin: bottom;
        margin-bottom: 1rem;

        .img {
            width: 100%;
            height: 100%;
        }
    }
`;

const ModalSuccessStyle = styled(m.div)`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.backdrop};
`;

export default SuccessWave;
