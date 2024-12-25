import { useCallback, useMemo, useState } from "react";
import {
  Canvas,
  Circle,
  FabricObject,
  Polygon,
  Rect,
  Shadow,
  Triangle,
} from "fabric";

import { useAutoResize } from "./use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  FabricObjectWithName,
  RECTANGE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "../types";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return (canvas.getObjects() as FabricObjectWithName[]).find(
      (obj) => obj.name === "clip"
    );
  };
  const center = (obj: FabricObject) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    if (center) canvas._centerObject(obj, center);
  };

  const addToCanvas = (obj: FabricObject) => {
    center(obj);
    canvas.add(obj);
    canvas.setActiveObject(obj);
  };

  return {
    addCircle: () => {
      const obj = new Circle({ ...CIRCLE_OPTIONS });
      addToCanvas(obj);
    },
    addSoftRectangle: () => {
      const obj = new Rect({ ...RECTANGE_OPTIONS, rx: 10, ry: 10 });
      addToCanvas(obj);
    },
    addRectangle: () => {
      const obj = new Rect({ ...RECTANGE_OPTIONS });
      addToCanvas(obj);
    },
    addTriangle: () => {
      const obj = new Triangle({ ...RECTANGE_OPTIONS, rx: 10, ry: 10 });
      addToCanvas(obj);
    },
    addInverseTriangle: () => {
      const [HEIGHT, WIDTH] = [TRIANGLE_OPTIONS.height, TRIANGLE_OPTIONS.width];
      const obj = new Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        { ...TRIANGLE_OPTIONS }
      );
      addToCanvas(obj);
    },
    addDiamond: () => {
      const [HEIGHT, WIDTH] = [DIAMOND_OPTIONS.height, DIAMOND_OPTIONS.width];
      const obj = new Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        { ...DIAMOND_OPTIONS }
      );
      addToCanvas(obj);
    },
  };
};

export const useEditor = () => {
  const [canvas, useCanvas] = useState<Canvas | null>(null);
  const [container, useContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const editor = useMemo(() => {
    if (canvas) return buildEditor({ canvas });
  }, [canvas]);

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

      // const tempRect = new Rect({
      //   width: 100,
      //   height: 100,
      //   name: "temp",
      //   fill: "red",
      //   left: 500,
      //   top: 300,
      // });

      // initialCanvas.add(tempRect);
    },
    []
  );
  return { init, editor };
};
