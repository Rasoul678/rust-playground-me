import React from "react";
import RunLogo from "/run.svg";

type IProps = {
  onClick: () => void;
  logo?: string;
};

const RunButton: React.FC<IProps> = ({ onClick, logo }) => {
  return (
    <img
      onClick={onClick}
      src={logo || RunLogo}
      title="execute"
      className="logo run"
      alt="Run logo"
    />
  );
};

export default RunButton;
