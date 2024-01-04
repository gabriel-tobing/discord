import { ReactNode } from "react";

interface LayoutsProps {
  children: ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  return (
    <div className="absolute flex flex-col w-full h-full bg-tertiary text-optimize overflow-hidden">{children}</div>
  );
};

export default Layouts;
