import { ChevronsLeft } from "lucide-react";
import { FC } from "react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

export const ToolSidebarClose: FC<ToolSidebarCloseProps> = ({ onClick }) => {
  return (
    <button
      className="absolute -right-[1.80rem] h-[70px] top-1/2 transform -translate-y-1/2 flex items-center rounded-r-xl px-1 pr-2 border-r border-y group bg-background"
      onClick={onClick}
    >
      <ChevronsLeft className="size-4 group-hover:opacity-75 translate" />
    </button>
  );
};
