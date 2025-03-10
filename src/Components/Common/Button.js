import { css, styled } from "styled-components";

const Icon = styled.span`
  position: absolute;
  top: 50%;
  ${({ iconPosition }) => iconPosition == "left" ? "left: 7px;": null}
  ${({ iconPosition }) => iconPosition == "right" ? "right: 7px;" : null}
  ${({ iconPosition }) => iconPosition == "center" ? "text-alignment: center;" : null}
  ${({ iconPosition }) => iconPosition == "center" ? "left: 50%;" : null}
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.3s !important;
`;

export const Button = ({
  type,
  btn,
  icon,
  iconPosition,
  children,
  ...otherProps
}) => {
  const ButtonComponent = getButtonType(btn);
  return (
    <ButtonComponent type={type} {...otherProps}>
      {children}
      <Icon iconPosition={iconPosition}>{icon}</Icon>
    </ButtonComponent>
  );
};

const getButtonType = (btn) => {
  switch (btn) {
    case "main":
    default:
      return MainButton;
    case "action":
      return ActionButton;
  }
};

const buttonBaseStyles = css`
  position: relative;
  display: inline-block;
  border: none;
  height: 40px;
  font-size: 16px;
  padding: 6px 25px;
  margin: 10px;
  &:hover {
    cursor: pointer;
    outline: 1px solid #fcb021;
  }
  &:hover ${Icon} {
    transform: translateY(-50%) rotate(360deg);
  }
  &:disabled {
    background-color: #cccccc;
    color:rgb(102, 102, 102);
    border: 1px solid #666666;
  }
  &:disabled:hover {
    outline: none;
    background-color: #cccccc;
    color: #666666;
    border: 1px solid #666666;
  }
  &:disabled ${Icon} {
    transform: translateY(-50%) rotate(0deg);
  }`;

const colors = {
  primary: "#0069cb",
  warning: "#E10D30",
  default: "#155EC2",
  success: "#12AC3F",
  info: "#AE1DC5",
};

const hoverColors = {
  primary: "#333",
  warning: "#900B21",
  default: "#0C3875",
  success: "#0B6F29",
  info: "#5B0D68",
};

const MainButton = styled.button`
  ${buttonBaseStyles};
  background-color: ${({ type }) => colors[type] || colors["primary"]};
  color: #ffffff;
  border: none;
  &:hover {
    background-color: ${({ type }) => hoverColors[type] || hoverColors["primary"]};
  }
`;

const ActionButton = styled.button`
  ${buttonBaseStyles};
  background-color: #ffffff;
  color: ${({ type }) => colors[type]};
  border: ${({ type }) => `1px solid ${colors[type]}`};
  &:hover {
    color: ${({ type }) => hoverColors[type]};
    border: ${({ type }) => `1px solid ${hoverColors[type]}`};
  }
`;
