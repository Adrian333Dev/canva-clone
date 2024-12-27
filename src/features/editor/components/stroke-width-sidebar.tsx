"use client";

import React, { FC } from "react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ActiveTool,
  ActiveTools,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
  editor?: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar: FC<StrokeWidthSidebarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const type = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const onClose = () => onChangeActiveTool("select");
  const onChangeStrokeWidth = (width: number) =>
    editor?.changeStrokeWidth(width);
  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "relative border-r z-[40] w-[300px] h-full flex flex-col",
        activeTool === ActiveTools.STROKE_WIDTH ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Change the stroke width of selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[width]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke type</Label>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full justify-start text-left p-3",
              !type.length && "bg-blue-500"
            )}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full border-slate-200 rounded-full border-4" />
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={cn(
              "w-full justify-start text-left p-3",
              type.length && type[0] === 5 && type[1] === 5 && "bg-blue-500"
            )}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full border-slate-200 rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
