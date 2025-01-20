import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CodeSkeleton: React.FC<IProps> = ({ className, ...props }) => {
  return (
    <Skeleton
      className={cn(
        "h-[50vh] md:h-[85vh] flex flex-col justify-evenly items-stretch px-4",
        className
      )}
      {...props}
    >
      <Skeleton className="w-[65%] h-[5%] bg-teal-700" />
      <Skeleton className="w-[20%] h-[5%] bg-rose-600" />
      <Skeleton className="w-[65%] h-[5%] bg-gray-700" />
      <Skeleton className="w-[35%] h-[5%] bg-yellow-700" />
      <Skeleton className="w-[60%] h-[5%] bg-cyan-600" />
      <Skeleton className="w-[75%] h-[5%] bg-green-600" />
      <Skeleton className="w-[45%] h-[5%] bg-gray-700" />
      <Skeleton className="w-[55%] h-[5%] bg-rose-600" />
      <Skeleton className="w-[90%] h-[5%] bg-cyan-600" />
      <Skeleton className="w-[60%] h-[5%] bg-orange-600" />
    </Skeleton>
  );
};

export default CodeSkeleton;
