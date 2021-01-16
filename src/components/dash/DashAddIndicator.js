import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion as m } from "framer-motion";
import { ChevronUp } from "react-feather";

//tree
import size from "../../utils/size";
import useStore from "../../../lib/store";
import { softerSpring } from "../../utils";

const DashAddIndicator = () => {
    const user = useStore((state) => state.user);
    const isMapLoaded = useStore((state) => state.isMapLoaded);
    return (
        <AnimatePresence>
            {!user.connected && isMapLoaded && (
                <DashIndicatorStyle
                    key="modals"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "50%", opacity: 0 }}
                    transition={softerSpring}
                    className="layer"
                >
                    <span className="container">
                        <ChevronUp />
                        Click or tap on where you are at the moment
                    </span>
                </DashIndicatorStyle>
            )}
        </AnimatePresence>
    );
};

const move = keyframes`
    0% {
        transform: translateY(0rem);
    }
    50% {
        transform: translateY(-.5rem);
    }
    
`;

const DashIndicatorStyle = styled(m.div)`
    position: absolute;
    left: 20%;
    bottom: 0;
    z-index: 99;
    height: 8.5rem;
    width: 65%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ theme }) => theme.style.shadow2};
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    @media (max-width: ${size.below600}) {
        width: 100%;
        left: initial;
    }
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: ${({ theme }) => theme.color.primary};
        font-weight: 600;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        svg {
            animation: ${move} 1.5s infinite ease-out;
        }
    }
`;
export default DashAddIndicator;
