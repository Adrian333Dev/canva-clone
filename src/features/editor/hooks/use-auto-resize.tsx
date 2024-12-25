import {
  Canvas,
  FabricObject,
  iMatrix,
  Point,
  Rect,
  TMat2D,
  util,
} from "fabric";
import { useCallback, useEffect, useRef } from "react";
import { FabricObjectWithName } from "../types";
import { useDebouncedCallback } from "@/hooks/use-debounce-cb";

interface IUseAutoResizeProps {
  canvas: Canvas | null;
  container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: IUseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const { offsetWidth, offsetHeight } = container;
    canvas.setDimensions({ width: offsetWidth, height: offsetHeight });

    const center = canvas.getCenterPoint();
    const zoomRatio = 0.95;
    const localWorkspace = (canvas.getObjects() as FabricObjectWithName[]).find(
      (obj) => obj.name === "clip"
    );
    if (!localWorkspace) return;
    const scale = util.findScaleToFit(localWorkspace, {
      width: offsetWidth,
      height: offsetHeight,
    });
    const zoom = zoomRatio * scale;
    canvas.setViewportTransform(iMatrix.concat() as TMat2D);
    canvas.zoomToPoint(new Point(center.x, center.y), zoom);

    const workspaceCenter = localWorkspace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    localWorkspace.clone().then((cloned) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  // Wrap `autoZoom` in a debounced callback
  const debouncedAutoZoom = useDebouncedCallback(autoZoom, 0); // Adjust delay as needed

  useEffect(() => {
    if (!canvas || !container) return;
    const resizeObserver = new ResizeObserver(() => {
      console.log("resize");
      debouncedAutoZoom();
    });
    resizeObserver.observe(container);
    return () => {
      resizeObserver?.disconnect();
    };
  }, [canvas, container, debouncedAutoZoom]);
};
