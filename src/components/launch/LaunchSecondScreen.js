import styled from "styled-components";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

//tree
import useStore from "../../../lib/store";
import { defaultSpring } from "../../utils";
import emojis from "../../../public/images/emojis";

const LaunchSecondScreen = ({ setStep }) => {
    const router = useRouter();
    const setLauchComplete = useStore((state) => state.setLauchComplete);
    const setUser = useStore((state) => state.setUser);
    const user = useStore((state) => state.user);
    const updateViewport = useStore((state) => state.updateViewport);

    const onSelectEmoji = (emoji) => {
        setUser({ emoji, isAddingPosition: true });
        setStep({ second: true });
        setLauchComplete(true);
        updateViewport({
            longitude: user.coords.long,
            latitude: user.coords.lat,
            zoom: 14,
        });
        router.push("/dash");
    };

    return (
        <>
            {emojis && (
                <>
                    <Title>
                        <span className="theme-1">One more thing,</span> pick an
                        emoji :
                    </Title>

                    <div style={{ width: "80%" }}>
                        {emojis.map((emoji, i) => {
                            return (
                                <Emojis
                                    whileHover={{ scale: 0.9 }}
                                    transition={defaultSpring}
                                    onClick={() => onSelectEmoji(emoji)}
                                    key={i}
                                    src={`/images/emojis/${emoji}`}
                                    alt="emoji"
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

export default LaunchSecondScreen;

const Title = styled.h2`
    font-size: 1.8rem;
    margin: 1.5rem 0 3.8rem 0;
    font-weight: 700;
`;

const Emojis = styled(m.img)`
    border: 0.67rem solid white;
    box-shadow: ${({ theme }) => theme.style.shadow1};
    border-radius: 20rem;
    width: calc(25% - 0.5rem);
    margin: -0.5rem 0.2rem 0.2rem 0.2rem;
    cursor: pointer;
`;
