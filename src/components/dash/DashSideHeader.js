import styled from "styled-components";

//tree
import { ChevronsLeft } from "react-feather";
import useStore from "../../../lib/store";
import BtnIcon from "../buttons/BtnIcon";

const DashSideHeader = () => {
    const setPanel = useStore((state) => state.setPanel);
    return (
        <DashSideHeaderStyle>
            <h1 className="title">citychat.io</h1>
            <BtnIcon onClick={() => setPanel({ side: false })}>
                <ChevronsLeft />
            </BtnIcon>
        </DashSideHeaderStyle>
    );
};

const DashSideHeaderStyle = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 7rem;
    padding: 0 2.8rem;
    box-shadow: ${({ theme }) => theme.style.shadow3};
    .title {
        user-select: none;
        font-weight: 800;
        font-size: 1.45rem;
    }
`;
export default DashSideHeader;
