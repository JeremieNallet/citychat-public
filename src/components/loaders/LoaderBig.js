import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import React from "react";

export const LoaderBig = () => {
    return <Item />;
};

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const Item = styled(motion.div)`
    border-radius: 100%;
    width: 6rem;
    height: 6rem;
    border: 0.5rem solid ${({ theme }) => theme.color.mat7};
    border-right: 0.5rem solid ${({ theme }) => theme.color.primary};
    position: relative;
    animation: ${spin} 1s linear infinite;
    will-change: transform;
`;

export default LoaderBig;
