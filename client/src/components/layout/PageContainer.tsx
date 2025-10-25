import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
  "2xl": "max-w-[1600px]",
  full: "max-w-full",
};

export function PageContainer({
  children,
  className,
  maxWidth = "lg",
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
}
