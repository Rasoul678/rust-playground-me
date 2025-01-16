import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface SkeletonProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Skeleton };
