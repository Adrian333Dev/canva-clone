import { useCallback, useState } from "react";
import { Canvas, FabricObject, Rect, Shadow } from "fabric";

import { useAutoResize } from "./use-auto-resize";

export const useEditor = () => {
  const [canvas, useCanvas] = useState<Canvas | null>(null);
  const [container, useContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      FabricObject.ownDefaults.cornerColor = "#e2e8f0";
      FabricObject.ownDefaults.cornerStyle = "circle";
      FabricObject.ownDefaults.cornerSize = 8;
      FabricObject.ownDefaults.borderColor = "#0284c7";
      FabricObject.ownDefaults.borderScaleFactor = 1;
      FabricObject.ownDefaults.transparentCorners = false;
      FabricObject.ownDefaults.borderOpacityWhenMoving = 1;
      FabricObject.ownDefaults.cornerStrokeColor = "#0284c7";

      const initialWorkspace = new Rect({
        width: 450,
        height: 600,
        name: "clip",
        fill: "#94a3b8",
        selectable: false,
        hasControls: false,
        shadow: new Shadow({ color: "rgba(0, 0, 0, 0.8)", blur: 5 }),
      });

      initialCanvas.setDimensions({
        width: initialContainer.clientWidth,
        height: initialContainer.clientHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      useCanvas(initialCanvas);
      useContainer(initialContainer);

      const tempRect = new Rect({
        width: 100,
        height: 100,
        name: "temp",
        fill: "red",
        left: 500,
        top: 300,
      });

      initialCanvas.add(tempRect);
    },
    []
  );
  return { init };
};
