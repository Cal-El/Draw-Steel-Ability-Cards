import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "./use-click-outside";


export function PopoverPicker({ color, onChange }: {color: string, onChange: (newColor: string) => void}) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="relative">
      <div
        className="w-10 h-10 border-3 border-white cursor-pointer rounded-lg"
        style={{ backgroundColor: color ? color : "#999999" }}
        onClick={() => toggle(true)} />

      {isOpen && (
        <div className="absolute top-10 left-0 rounded-lg" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
