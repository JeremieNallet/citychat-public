import styled from "styled-components";
import { useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { XCircle } from "react-feather";

//folders
import useStore from "../../../lib/store";
import { defaultSpring, softerSpring } from "../../utils";
import useOnClickOutside from "use-onclickoutside";

const GlobalError = () => {
    const errorRef = useRef(null);
    useOnClickOutside(errorRef, () => setGlobalError(""));
    const setGlobalError = useStore((state) => state.setGlobalError);
    const globalError = useStore((state) => state.globalError);

    return (
        <>
            <AnimatePresence>
                {globalError && (
                    <ModalErrorStyle
                        ref={errorRef}
                        key="modals"
                        initial={{ y: "-100%" }}
                        animate={{ y: "-35%" }}
                        exit={{ y: "-100%" }}
                        transition={softerSpring}
                    >
                        {globalError}
                        <XCircle
                            transition={defaultSpring}
                            onClick={() => setGlobalError(null)}
                        />
                    </ModalErrorStyle>
                )}
            </AnimatePresence>
        </>
    );
};

const ModalErrorStyle = styled(m.div)`
    height: 9.5rem;
    width: 100vw;
    position: fixed;
    background: ${({ theme }) => theme.color.secondary};
    top: 0;
    z-index: 99;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: white;
    padding-bottom: 2rem;
    font-weight: 300;
    font-size: 1.4rem;

    svg {
        position: absolute;
        right: 2rem;
        width: 1.9rem;
        height: 1.9rem;
        margin-right: 0.2rem;
        :hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
`;

export default GlobalError;
