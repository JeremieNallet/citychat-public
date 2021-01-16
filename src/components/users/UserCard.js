import styled from "styled-components";
import { useState } from "react";
import { motion as m } from "framer-motion";

//folders
import { MoreVertical, X } from "react-feather";
import { defaultSpring, timeFromNow } from "../../utils";
import BtnIcon from "../buttons/BtnIcon";
import UserCardMenu from "./UserCardMenu";

const UserCard = ({
    name,
    primaryAction,
    secondaryAction,
    img,
    onClick,
    me,
    tsp,
    joined,
}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <UserCardStyle
            me={me}
            showMenu={showMenu}
            onClick={onClick}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 40px 5px rgba(200, 209, 232, 0.411)",
            }}
            transition={defaultSpring}
        >
            <div className="content">
                <div className="img">
                    <img
                        className="img__item"
                        src={`/images${img}`}
                        alt="emoji"
                    />
                </div>
                <div className="text">
                    <span className="text__name">{name}</span>
                    <div className="text__tsp">{tsp && timeFromNow(tsp)}</div>
                    <div className="text__tsp">
                        {joined && `Joined ${timeFromNow(joined)}`}
                    </div>
                </div>
            </div>
            <div className="btn-menu">
                {!me && (
                    <BtnIcon
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                    >
                        {showMenu ? <X /> : <MoreVertical />}
                    </BtnIcon>
                )}
            </div>
            <UserCardMenu
                showMenu={showMenu}
                secondaryAction={secondaryAction}
                primaryAction={primaryAction}
                setShowMenu={setShowMenu}
            />
        </UserCardStyle>
    );
};

const UserCardStyle = styled(m.div)`
    overflow: hidden;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius: 1.5rem;
    padding: 3.5rem 2rem;
    margin-bottom: 0.9rem;
    box-shadow: ${({ theme: { style } }) => style.shadow1};
    cursor: pointer;

    .content {
        transition: 0.2s;
        opacity: ${(props) => (props.showMenu ? 0 : 1)};
        display: flex;
        align-items: center;
        .img {
            width: 4.3rem;
            height: 4.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1.5rem;
            &__item {
                width: 100%;
                height: 100%;
            }
        }
        .text {
            &__name {
                font-weight: 600;
                display: block;
                font-size: 1.65rem;
                margin-bottom: 0.2rem;
            }
            &__tsp {
                font-size: 1.3rem;
                font-weight: 400;
                color: ${({ theme: { color } }) => color.mat3};
            }
        }
    }
    .btn-menu {
        margin-right: -1rem;
        button > svg {
            stroke: ${({ theme }) => theme.color.mat3};
        }
    }
`;
export default UserCard;
