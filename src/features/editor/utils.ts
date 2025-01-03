import { RGBColor } from "react-color";

export const isTextType = (type?: string) =>
  type === "text" || type === "i-text" || type === "textbox";

export const rgbaObjToStr = (rgba: RGBColor | "transparent") => {
  if (rgba === "transparent") return "rgba(0, 0, 0, 0)";
  const alpha = rgba.a ?? 1;
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};
