"use client";

import React, { FC } from "react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { ActiveTool, ActiveTools, Editor, FILL_COLOR, STROKE_COLOR } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "./shape-tool";
import { ColorPicker } from "./color-picker";

interface StrokeColorSidebarProps {
  editor?: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeColorSidebar: FC<StrokeColorSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const value = editor?.getActiveFillColor() || STROKE_COLOR;
  const onClose = () => onChangeActiveTool("select");
  const onChange = (color: string) => editor?.changeStrokeColor(color);

  return (
    <aside
      className={cn(
        "relative border-r z-[40] w-[300px] h-full flex flex-col",
        activeTool === ActiveTools.STROKE_COLOR ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Change the stroke color of selected object"
      />
      <ScrollArea className="p-4">
        <div className="p-4 space-y-6">
          {editor && <ColorPicker value={value} onChange={onChange} />}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
