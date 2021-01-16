import styled, { css } from "styled-components";
import { motion as m } from "framer-motion";
import { ArrowRight } from "react-feather";

//folders
import { defaultSpring } from "../../utils";

const BtnRect = ({
    title,
    width = "initial",
    color,
    arrowRight = false,
    height = "5rem",
    ...rest
}) => (
    <BtnRectStyle
        aria-label="icon button"
        style={{ width, height }}
        color={color}
        {...rest}
    >
        <m.div
            className="background-layer"
            whileHover={{ scale: 1.012, opacity: 0.9 }}
            transition={{
                ...defaultSpring,
                damping: 14,
                mass: 1.2,
            }}
        />

        <span className="title">
            {title}
            {arrowRight && <ArrowRight />}
        </span>
    </BtnRectStyle>
);

export default BtnRect;

const BtnRectStyle = styled.button`
    color: white;
    height: 5rem;
    padding: 0 3.5rem;
    border: none;
    font-size: 1.5rem;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.1s;
    &:hover {
        svg {
            transform: translate3d(1rem, 0, 0);
        }
        ${({ color }) => {
            if (color === "theme3") {
                return css`
                    filter: brightness(97%);
                `;
            }
        }}
    }

    .background-layer {
        border-radius: 0.9rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        ${({ color }) => {
            if (color === "theme1") {
                return css`
                    background: ${({ theme }) => theme.color.primary};
                `;
            }
            if (color === "theme2") {
                return css`
                    background: ${({ theme }) => theme.color.secondary};
                `;
            }
            if (color === "theme3") {
                return css`
                    background: ${({ theme }) => theme.color.mat5};
                    color: ${({ theme }) => theme.color.mat1};
                `;
            }
        }}
    }
    .title {
        font-weight: 600;
        letter-spacing: 0.03em;
        position: relative;
        z-index: 2;
        pointer-events: none;
        display: flex;
        font-size: 1.4rem;
        ${({ color }) => {
            if (color === "theme3") {
                return css`
                    color: ${({ theme }) => theme.color.mat1};
                `;
            }
        }}
        svg {
            width: 1.7rem;
            height: 1.7rem;
            position: relative;
            right: -0.8rem;
            transition: 0.2s cubic-bezier(0.47, 0.31, 0.23, 0.99);
        }
    }
`;
