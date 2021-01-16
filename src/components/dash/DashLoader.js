import styled from "styled-components";

//foders
import LoaderBig from "../loaders/LoaderBig";

const DashLoader = ({ transparent = false }) => {
    return (
        <MapLoaderStyle transparent={transparent}>
            <LoaderBig />
        </MapLoaderStyle>
    );
};

const MapLoaderStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, transparent }) =>
        !transparent ? theme.color.backdrop : "transparent"};
    opacity: 1;
`;

export default DashLoader;
