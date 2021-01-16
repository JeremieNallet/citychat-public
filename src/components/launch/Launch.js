import { useState } from "react";
import styled from "styled-components";

//tree
import LaunchFirstScreen from "./LaunchFirstScreen";
import LaunchSecondScreen from "./LaunchSecondScreen";
import LaunchLayout from "./LaunchLayout";
import { softerSpring } from "../../utils";
import useStore from "../../../lib/store";
import size from "../../utils/size";

const variants = {
    initial: { y: 25, opacity: 0 },
    animate: { y: 0, opacity: 1 },
};

const Launch = () => {
    const launchComplete = useStore((state) => state.launchComplete);
    const [step, setStep] = useState({
        first: false,
        second: false,
        completed: false,
    });

    return (
        <>
            {!launchComplete && (
                <LaunchStyle>
                    <div className="bg-layer" />
                    {!step.first && (
                        <LaunchLayout style={{ width: "50rem" }}>
                            <LaunchFirstScreen setStep={setStep} />
                        </LaunchLayout>
                    )}
                    {step.first && (
                        <LaunchLayout
                            style={{ width: "45rem" }}
                            transition={softerSpring}
                            initial="initial"
                            animate="animate"
                            variants={variants}
                        >
                            <LaunchSecondScreen setStep={setStep} />
                        </LaunchLayout>
                    )}
                </LaunchStyle>
            )}
        </>
    );
};

export default Launch;

const LaunchStyle = styled.section`
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    min-height: 0;
    overflow: auto;
    background: url("/images/misc/map.png");
    background-size: cover;
    background-position: center;
    padding: 2rem;
    .bg-layer {
        height: 100vh;
        width: 100vw;
        position: fixed;
        background: ${({ theme }) => theme.color.backdrop};
        opacity: 0.4;
        top: 0;
        left: 0;
        z-index: -1;
        @media (max-width: ${size.below600}) {
            background: white;
            opacity: 0.7;
        }
    }
    @media (max-width: ${size.below930}) {
        padding: 1rem;
    }
    @media (max-width: ${size.below600}) {
        padding: 0;
    }
`;
