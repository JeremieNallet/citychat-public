import styled from "styled-components";
import { useEffect } from "react";
import { motion as m, useMotionValue, useSpring } from "framer-motion";

//folders
import useStore from "../../../lib/store";

const springConfig = {
    damping: 50,
    stiffness: 1200,
    bounce: 0,
    velocty: 50,
    mass: 1.05,
};

const DashCursor = () => {
    const user = useStore((state) => state.user);
    const isMapLoaded = useStore((state) => state.isMapLoaded);

    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const cursorStyle = {
        translateX: cursorXSpring,
        translateY: cursorYSpring,
    };

    useEffect(() => {
        const followCursor = ({ clientX, clientY }) => {
            cursorX.set(clientX);
            cursorY.set(clientY);
        };
        window.addEventListener("mousemove", followCursor);

        return () => {
            window.removeEventListener("mousemove", followCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {user.isAddingPosition && isMapLoaded && (
                <DashCursorStyle style={cursorStyle}>
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src={`/images/emojis/${user.emoji}`}
                        alt="emoji"
                    />
                </DashCursorStyle>
            )}
        </>
    );
};

const DashCursorStyle = styled(m.div)`
    position: fixed;
    z-index: 1;
    top: -0.5rem;
    left: -2rem;
    transform-origin: center;
    pointer-events: none;
    width: 4rem;
    height: 4rem;
`;

export default DashCursor;
