import styled from "styled-components";
import Router from "next/router";
import { useEffect } from "react";
import { motion as m } from "framer-motion";

//tree
import useStore from "../../../lib/store";
import { softerSpring } from "../../utils";
import size from "../../utils/size";
import { useMediaQuery } from "react-responsive";

const DropdownLayout = ({ children, title, width = "40rem" }) => {
    const setPanel = useStore((state) => state.setPanel);
    const isMobile = useMediaQuery({ query: `(max-width: ${size.below600})` });

    useEffect(() => {
        const closeMenuPanel = () => {
            setPanel({ messengerMenu: false, notification: false });
        };
        Router.events.on("routeChangeStart", closeMenuPanel);
        return () => Router.events.off("routeChangeStart", closeMenuPanel);
    }, [setPanel]);

    return (
        <LayoutMenu
            style={{ width: isMobile ? "calc(100vw - 2rem)" : width }}
            transition={softerSpring}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
        >
            <LayoutHead>
                <span>{title}</span>
            </LayoutHead>
            <LayoutContent>{children}</LayoutContent>
        </LayoutMenu>
    );
};

export default DropdownLayout;

const LayoutMenu = styled(m.div)`
    position: absolute;
    overflow-y: auto;
    background: white;
    box-shadow: ${({ theme }) => theme.style.shadow2};
    right: 0;
    top: 5.5rem;

    border-radius: 2rem;
    max-height: calc(100vh - 30rem);
`;

const LayoutHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6rem;
    font-weight: 600;
    padding: 0 2.8rem;
    font-size: 1.8rem;
`;

const LayoutContent = styled.div`
    width: 100%;
    padding: 0.5rem 2rem 4rem 2rem;
`;
