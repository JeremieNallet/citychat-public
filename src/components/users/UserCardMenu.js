import styled from "styled-components";
import { AnimatePresence, motion as m } from "framer-motion";

//folders
import { ArrowRight } from "react-feather";
import { softerSpring } from "../../utils";

const UserCardMenu = ({
    showMenu,
    primaryAction,
    setShowMenu,
    secondaryAction,
}) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {showMenu && (
                <UserCardMenuStyle
                    key="modal"
                    initial={{ x: "-10%", opacity: 0 }}
                    animate={{ x: "0%", opacity: 1 }}
                    exit={{ x: "-15%", opacity: 0 }}
                    transition={softerSpring}
                >
                    <ul>
                        {primaryAction && (
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    primaryAction();
                                    setShowMenu(!showMenu);
                                }}
                            >
                                <ArrowRight />
                                wave at this user
                            </li>
                        )}
                        {secondaryAction && (
                            <li
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    secondaryAction();
                                }}
                            >
                                <ArrowRight />
                                delete notification
                            </li>
                        )}
                    </ul>
                </UserCardMenuStyle>
            )}
        </AnimatePresence>
    );
};

const UserCardMenuStyle = styled(m.div)`
    position: absolute;
    background: transparent;
    pointer-events: none;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    border-radius: 2rem;
    pointer-events: none;

    ul {
        pointer-events: initial;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 1rem;

        li {
            pointer-events: initial;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            margin: 0.2rem;
            font-weight: 600;

            padding: 0.4rem 1rem;
            cursor: pointer;
            border-radius: 0.4rem;
            :hover {
                opacity: 0.5;
            }
            svg {
                margin-right: 0.7rem;
                width: 2rem;
                height: 2rem;
                stroke: ${({ theme: { color } }) => color.mat3};
            }
        }
    }
`;

export default UserCardMenu;
