import React from "react";
import RunLogo from "/run.svg";

type IProps = {
  onClick: () => void;
  logo?: string;
  alt?: string;
};

const RunButton: React.FC<IProps> = ({ onClick, logo, alt }) => {
  return (
    <img
      onClick={onClick}
      src={logo || RunLogo}
      title={alt || "execute"}
      className="logo run"
      alt="Run logo"
    />
  );
};

export default RunButton;
