import React from "react";
import CodeSkeleton from "../code-skeleton";
import { Skeleton } from "../ui/skeleton";

type IProps = {};

const PreviewRunSkeleton: React.FC<IProps> = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <CodeSkeleton className="w-full md:w-[50%]" />
      <Skeleton className="h-[30vh] md:h-[69vh] w-full md:w-[50%]" />
    </div>
  );
};

export default PreviewRunSkeleton;
