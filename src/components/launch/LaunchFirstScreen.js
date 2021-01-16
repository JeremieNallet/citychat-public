import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { MapPin, User } from "react-feather";

//tree
import LaunchInput from "./LaunchInput";
import useStore from "../../../lib/store";
import BtnRect from "../buttons/BtnRect";

const errorMessage = "You need to select a place from the list.";
const LaunchFirstScreen = ({ setStep }) => {
    const [placeNotSelected, setPlaceNotSelected] = useState("");
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const { register, errors, handleSubmit } = useForm();

    const submitNextStep = ({ name }) => {
        if (user.coords) {
            setUser({ name });
            setStep({ first: true });
        } else {
            setPlaceNotSelected(errorMessage);
        }
    };

    return (
        <>
            <Logo src="/images/logo/logo.svg" alt="logo" />
            <Title>
                <span className="bit-text">
                    welcome to <span className="theme-1">citychat.io</span>
                </span>
                <span className="small-text">
                    citychat.io is an awesome place where you can talk with
                    everyone in your city and share your position with others on
                    a map.
                </span>
            </Title>
            <Form onSubmit={handleSubmit(submitNextStep)}>
                <LaunchInput
                    placeholder="Choose a nickname"
                    type="text"
                    name="name"
                    withSearch={false}
                    errors={errors}
                    icon={<User />}
                    forwardRef={register({
                        required: "Your name is required",
                    })}
                    errorMessage={
                        errors.name && <Error>{errors.name.message}</Error>
                    }
                />
                <LaunchInput
                    placeholder="Where are you now ?"
                    type="text"
                    name="place"
                    withSearch={true}
                    errors={errors}
                    icon={<MapPin />}
                    clearError={() => setPlaceNotSelected(false)}
                    forwardRef={register({
                        required: errorMessage,
                    })}
                    errorMessage={
                        <>
                            {errors.place && (
                                <Error>{errors.place.message}</Error>
                            )}
                            {placeNotSelected && !errors.place && (
                                <Error>{errorMessage}</Error>
                            )}
                        </>
                    }
                />
                <BtnRect
                    height="6rem"
                    color="theme1"
                    width="100%"
                    title="Continue"
                    arrowRight
                />
            </Form>
        </>
    );
};

export default LaunchFirstScreen;

const Logo = styled.img`
    width: 5.2rem;
    height: 5.2rem;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    .big-text {
        font-size: 2.2rem;
    }
    .small-text {
        font-size: 1.6rem;
        font-weight: 300;
        line-height: 1.7em;
        font-style: normal;
        color: ${({ theme }) => theme.color.mat2};
        margin: 0.9rem 0 2.2rem 0;
        text-align: center;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        margin-top: 1rem;
    }
`;
const Error = styled.span`
    font-size: 1.05rem;
    height: fit-content;
    display: block;
    margin-top: -0.8rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.color.secondary};
`;
