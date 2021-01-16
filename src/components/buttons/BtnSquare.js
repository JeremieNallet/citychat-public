import styled, { css } from "styled-components";
import { motion as m } from "framer-motion";

//tree
import { defaultSpring } from "../../utils";
import size from "../../utils/size";

const BtnSquare = ({
    notificationCount,
    children,
    color = "theme1",
    ...rest
}) => {
    return (
        <BtnSquareStyle color={color}>
            {notificationCount > 0 && (
                <span className="notification-chip">
                    <span className="notification-chip__number">
                        {notificationCount >= 99 ? 99 : notificationCount}
                    </span>
                </span>
            )}
            <button className="button" {...rest}>
                <m.div
                    className="background-layer"
                    color={color}
                    whileHover={{ scale: 1.06 }}
                    transition={{
                        ...defaultSpring,
                        damping: 10,
                    }}
                />
                {children}
            </button>
        </BtnSquareStyle>
    );
};
export default BtnSquare;

const BtnSquareStyle = styled.div`
    position: relative;
    .notification-chip {
        position: absolute;
        z-index: 2;
        top: -1rem;
        right: -0.5rem;
        display: block;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 20rem;
        background: ${({ theme }) => theme.color.secondary};
        display: flex;
        align-items: center;
        justify-content: center;
        &__number {
            color: white;
            font-size: 1.1rem;
        }
    }
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        height: 5rem;
        width: 5rem;
        @media (max-width: ${size.below600}) {
            width: 4rem;
            height: 4rem;
            svg {
                width: 2rem;
                height: 2rem;
            }
        }

        position: relative;

        ${({ color }) => {
            if (color === "theme1") {
                return css`
                    svg {
                        color: initial;
                    }
                `;
            }
            if (color === "theme2") {
                return css`
                    svg {
                        color: white;
                    }
                `;
            }
        }}

        svg {
            pointer-events: none;
            position: relative;
            z-index: 2;
            stroke: ${({ theme }) => theme.color.mat1};
        }
    }
    .background-layer {
        border-radius: 1.1rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        ${({ color }) => {
            if (color === "theme1") {
                return css`
                    box-shadow: ${({ theme }) => theme.style.shadow1};
                    background: white;
                    svg {
                        display: none;
                    }
                `;
            }
            if (color === "theme2") {
                return css`
                    box-shadow: ${({ theme }) => theme.style.shadow1};
                    background: ${({ theme }) => theme.color.secondary};
                `;
            }
        }}
        :hover {
            box-shadow: ${({ theme }) => theme.style.shadow2};
        }
    }
`;
