import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-full aspect-video py-4 flex flex-col rounded-none",
        isActive && "bg-muted text-primary"
      )}
      onClick={onClick}
    >
      <Icon className="size-4 stroke-2 shrink-0" />
      <span className="text-xs">{label}</span>
    </Button>
  );
};
