import styled from "styled-components";

const DashSkeleton = () => {
    return (
        <DashSkeletonStyle>
            {Array.from({ length: 7 }, (_, i) => (
                <div className="item" key={i}></div>
            ))}
        </DashSkeletonStyle>
    );
};

const DashSkeletonStyle = styled.div`
    height: 100%;
    width: 100%;
    .item {
        height: 17rem;
        border-radius: 2rem;
        background: ${({ theme }) => theme.color.mat4};
        opacity: 0.6;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 3rem;
    }
`;

export default DashSkeleton;
