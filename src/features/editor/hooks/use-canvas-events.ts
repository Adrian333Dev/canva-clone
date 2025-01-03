import { Canvas, FabricObject } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: Canvas | null;
  setSelectedObjects: (objects: FabricObject[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        console.log("selection:created", e);
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:updated", (e) => {
        console.log("selection:updated", e);
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:cleared", () => {
        console.log("selection:cleared");
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        // canvas.off("selection:created");
        // canvas.off("selection:updated");
        // canvas.off("selection:cleared");
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback]);
};
