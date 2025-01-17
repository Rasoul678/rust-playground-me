import { cn } from "@/lib/utils";
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Spinner: React.FC<IProps> = ({ className, ...props }) => {
  return <div className={cn("loader", className)} {...props} />;
};

export default Spinner;
