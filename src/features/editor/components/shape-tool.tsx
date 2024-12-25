import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface ShapeToolProps {
  onClick: () => void;
  icon: IconType | LucideIcon;
  iconClassName?: string;
}

export const ShapeTool: FC<ShapeToolProps> = ({
  onClick,
  icon: Icon,
  iconClassName,
}) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon className={cn("w-full h-full", iconClassName)} />
    </button>
  );
};
