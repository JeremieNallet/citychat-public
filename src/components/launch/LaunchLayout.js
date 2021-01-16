import styled from "styled-components";
import { motion as m } from "framer-motion";
import Link from "next/link";

//tree
import size from "../../utils/size";

const ScreenLayout = ({ width, children, ...rest }) => {
    return (
        <LaunchLayoutStyle style={{ width }} {...rest}>
            {children}
            <small className="privacy">
                <Link href="/privacy">
                    <a target="_blank">privacy</a>
                </Link>
                <span className="privacy__separator">|</span>
                <a className="privacy__email" href="mailto:hello@citychat.io">
                    hello@citychat.io
                </a>
            </small>
        </LaunchLayoutStyle>
    );
};

const LaunchLayoutStyle = styled(m.div)`
    margin: auto;
    padding: 3rem 6rem 5rem 6rem;
    min-width: 55rem;
    border-radius: 2rem;
    display: flex;
    min-height: 0;
    position: relative;
    top: -2rem;
    align-items: center;
    flex-direction: column;
    background: white;
    box-shadow: ${({ theme }) => theme.style.shadow2};

    @media (max-width: ${size.below600}) {
        overflow: auto;
        padding: 2rem 1rem 12rem 1rem;
        justify-content: center;
        box-shadow: none;
        min-width: initial;
        top: initial;
        background: none;
    }

    .privacy {
        height: 7rem;
        display: block;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        color: ${({ theme }) => theme.color.mat3};
        font-size: 1.2rem;

        &__separator {
            margin: 0 0.5rem;
        }
        &__email:hover {
            color: ${({ theme }) => theme.color.mat1};
        }
    }
`;

export default ScreenLayout;
