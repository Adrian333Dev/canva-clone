import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "../types";
import { rgbaObjToStr } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => onChange(rgbaObjToStr(color.rgb))}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => onChange(rgbaObjToStr(color.rgb))}
      />
    </div>
  );
};
