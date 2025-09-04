import { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import useClickOutside from "./use-click-outside";


export function PopoverPicker({ color, onChange }: {color: string, onChange: (newColor: string) => void}) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="relative flex flex-row space-x-2 items-center">
      <span className="text-xl">#</span>
      <HexColorInput className="p-1 max-w-28 h-10 rounded-md border-2 border-stone-400" color={color} onChange={onChange}/>
      <div
        className="w-10 h-10 border-2 border-stone-400 cursor-pointer rounded-lg"
        style={{ backgroundColor: color ? color : "#999999" }}
        onClick={() => toggle(true)} />

      {isOpen && (
        <div className="absolute top-10 left-0 rounded-lg z-40" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
