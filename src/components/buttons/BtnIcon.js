import { motion as m } from "framer-motion";
import styled, { css } from "styled-components";
import { defaultSpring } from "../../utils";

const BtnIcon = ({ children, color = "theme1", ...rest }) => {
    return (
        <BtnIconStyle
            color={color}
            aria-label="icon button"
            whileTap={{ scale: 0.9 }}
            transition={defaultSpring}
            {...rest}
        >
            {children}
        </BtnIconStyle>
    );
};

const BtnIconStyle = styled(m.button)`
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    height: fit-content;
    background: none;

    ${({ color }) => {
        if (color === "theme1") {
            return css`
                :hover {
                    cursor: pointer;
                    background: ${({ theme }) => theme.color.mat4};
                }
                svg {
                    stroke: ${({ theme }) => theme.color.mat1};
                }
            `;
        }
        if (color === "theme2") {
            return css`
                :hover {
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.11);
                }
                svg {
                    stroke: ${({ theme }) => theme.color.mat4};
                }
            `;
        }
        if (color === "theme3") {
            return css`
                :hover {
                    cursor: pointer;
                    background: ${({ theme }) => theme.color.mat4};
                }
                svg {
                    stroke: ${({ theme }) => theme.color.mat3};
                }
            `;
        }
    }}
`;
export default BtnIcon;
