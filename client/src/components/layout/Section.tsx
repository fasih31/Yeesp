import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "gradient" | "transparent";
}

const spacingClasses = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-gray-50",
  gradient: "bg-gradient-to-br from-primary/5 to-accent/5",
  transparent: "bg-transparent",
};

export function Section({
  children,
  className,
  spacing = "md",
  background = "transparent",
}: SectionProps) {
  return (
    <section
      className={cn(
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}
