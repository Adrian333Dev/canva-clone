"use client";
import React, { FC, useState } from "react";
import colors from "tailwindcss/colors";

import { ActiveTool, ActiveTools, Editor, FILL_COLOR } from "../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";

interface ToolbarProps {
  editor?: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar: FC<ToolbarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (!editor?.selectedObjects.length)
    return (
      <div className="bg-background shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
    );

  return (
    <div className="bg-background shrink-0 h-[56px] border-b w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center h-full justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool(ActiveTools.FILL)}
            size={"icon"}
            variant={"ghost"}
            className={cn(activeTool === ActiveTools.FILL && "bg-gray-800")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{ backgroundColor: fillColor }}
            />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Stroke color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool(ActiveTools.STROKE_COLOR)}
            size={"icon"}
            variant={"ghost"}
            className={cn(
              activeTool === ActiveTools.STROKE_COLOR && "bg-gray-800"
            )}
          >
            <div
              className="rounded-sm size-4 border-2"
              style={{ borderColor: strokeColor }}
            />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Stroke width" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool(ActiveTools.STROKE_WIDTH)}
            size={"icon"}
            variant={"ghost"}
            className={cn(
              activeTool === ActiveTools.STROKE_WIDTH && "bg-gray-800"
            )}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
