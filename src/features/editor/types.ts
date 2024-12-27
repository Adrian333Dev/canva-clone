import { Canvas, FabricObject } from "fabric";
import materialColors from "material-colors";
import tailwindColors from "tailwindcss/colors";

export const colors = [
  materialColors.red[500],
  materialColors.pink[500],
  materialColors.purple[500],
  materialColors.deepPurple[500],
  materialColors.indigo[500],
  materialColors.blue[500],
  materialColors.lightBlue[500],
  materialColors.cyan[500],
  materialColors.teal[500],
  materialColors.green[500],
  materialColors.lightGreen[500],
  materialColors.lime[500],
  materialColors.yellow[500],
  materialColors.amber[500],
  materialColors.orange[500],
  materialColors.deepOrange[500],
  materialColors.brown[500],
  materialColors.blueGrey[500],
  "transparent",
];

export type FabricObjectWithName = FabricObject & { name?: string };

// export type ActiveTool =
//   | "select"
//   | "shapes"
//   | "text"
//   | "images"
//   | "draw"
//   | "fill"
//   | "stroke-color"
//   | "stroke-width"
//   | "font"
//   | "opacity"
//   | "filter"
//   | "settings"
//   | "ai"
//   | "remove-bg"
//   | "templates";

export const ActiveTools = {
  SELECT: "select",
  SHAPES: "shapes",
  TEXT: "text",
  IMAGES: "images",
  DRAW: "draw",
  FILL: "fill",
  STROKE_COLOR: "stroke-color",
  STROKE_WIDTH: "stroke-width",
  FONT: "font",
  OPACITY: "opacity",
  FILTER: "filter",
  SETTINGS: "settings",
  AI: "ai",
  REMOVE_BG: "remove-bg",
  TEMPLATES: "templates",
} as const;

// Derive the type from the object's values
export type ActiveTool = (typeof ActiveTools)[keyof typeof ActiveTools];

export type BuildEditorProps = {
  canvas: Canvas;
  selectedObjects: FabricObject[];
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
};

export interface Editor {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;

  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;

  canvas: Canvas;
  selectedObjects: FabricObject[];
  strokeWidth: number;
}

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}

// ! Constants

export const FILL_COLOR: string = tailwindColors.gray[300];
export const STROKE_COLOR: string = tailwindColors.gray[600];
export const STROKE_WIDTH = 2;

export const GLOBAL_OBJECT_WIDTH = 200;

export const CIRCLE_OPTIONS = {
  radius: GLOBAL_OBJECT_WIDTH / 2,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: GLOBAL_OBJECT_WIDTH,
  height: GLOBAL_OBJECT_WIDTH,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: GLOBAL_OBJECT_WIDTH,
  height: GLOBAL_OBJECT_WIDTH,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: GLOBAL_OBJECT_WIDTH,
  height: GLOBAL_OBJECT_WIDTH,
  angle: 0,
};

export const SELECTION_DEPENDENT_TOOLS: ActiveTool[] = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];
