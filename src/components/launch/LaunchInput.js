import { useMemo, useState } from "react";
import styled from "styled-components";
import Mapbox from "mapbox";
import { motion as m } from "framer-motion";

//tree
import useStore from "../../../lib/store";
import { debounce } from "../../utils";

const mapbox = new Mapbox(process.env.MAPBOX_KEY);
const timeout = 500;

const LaunchInput = ({
    type,
    name,
    forwardRef,
    icon,
    errorMessage,
    withSearch,
    placeholder,
    clearError = () => {},
}) => {
    const setUser = useStore((state) => state.setUser);
    const [label, setLabel] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [showResults, setShowResults] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const _onFocus = () => setIsFocus(true);
    const _onBlur = () => {
        setTimeout(() => setShowResults(false), timeout);
        setShowResults(false);
        !withSearch && setLabel(inputValue);
        setIsFocus(false);
    };

    const _onChange = async ({ target: { value } }) => {
        setInputValue(value);
        getResults(value);
    };
    const onSelectLocation = (place, coords) => {
        setLabel(place);
        setInputValue(place);
        setUser({ coords: { long: coords[0], lat: coords[1] } });
        setShowResults(false);
        clearError();
    };

    const getResults = useMemo(() => {
        return debounce(async (searchValue) => {
            if (searchValue && inputValue.length > 0) {
                try {
                    setShowResults(true);
                    const { entity } = await mapbox.geocodeForward(
                        searchValue,
                        { limit: 3 }
                    );
                    setSearchResults(entity.features);
                } catch (error) {
                    setShowResults(false);
                    console.error(error);
                }
            }
        }, timeout);
    }, [inputValue.length]);

    const renderText = () =>
        label ? `${name === "place" ? "Aaah," : ""} ${label}.` : placeholder;

    return (
        <LaunchInputStyle onBlur={_onBlur} onFocus={_onFocus}>
            {!isFocus && (
                <label className="label" htmlFor={name}>
                    {icon} {renderText()}
                </label>
            )}
            <InputItem
                id={name}
                isFocus={isFocus}
                onChange={_onChange}
                ref={forwardRef}
                autoComplete="off"
                type={type}
                name={name}
            />
            {errorMessage}
            <>
                {withSearch && showResults && inputValue.trim().length !== 0 && (
                    <ul className="results-list">
                        {searchResults
                            .filter((el) => el.id.split(".")[0] !== "country")
                            .map((el) => {
                                const place = el.place_name.split(",")[0];
                                const coords = el.center;
                                return (
                                    <li
                                        className="results-list__item"
                                        key={el.id}
                                        onMouseDown={() =>
                                            onSelectLocation(place, coords)
                                        }
                                    >
                                        {el.place_name}
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </>
        </LaunchInputStyle>
    );
};

const LaunchInputStyle = styled.div`
    height: fit-content;
    width: 100%;
    position: relative;

    .label {
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;
        left: 5%;
        top: 1.9rem;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.color.mat3};
        svg {
            width: 1.9rem;
            height: 1.9rem;
            margin-right: 1rem;
        }
    }
    .results-list {
        position: absolute;
        z-index: 5;
        top: 5.5rem;
        width: 100%;
        background: white;
        border: 0.2rem solid ${({ theme }) => theme.color.primary};
        border-top: 0;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        overflow: hidden;
        &__item {
            list-style: none;
            padding: 1rem 2rem;

            :hover {
                background: ${({ theme }) => theme.color.mat4};
                cursor: pointer;
            }

            :last-child {
                margin-bottom: 1rem;
            }
        }
    }
`;

const InputItem = styled(m.input)`
    padding: 0 2rem;
    color: ${(props) => (!props.isFocus ? "transparent" : "inherit")};
    font-family: inherit;
    font-size: 1.6rem;
    height: 6rem;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.color.mat4};
    border: 0.2rem solid transparent;

    :focus {
        border: 0.2rem solid ${({ theme }) => theme.color.primary};
    }
`;

export default LaunchInput;
