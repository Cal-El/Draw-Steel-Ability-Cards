import {ChangeEvent, useEffect, useState} from "react";
import { HexColorPicker } from "react-colorful";

export function PopoverPicker({label, toggle, color, onChange }: {
  label: string,
  toggle?: {
    enabled: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  },
  color: string,
  onChange: (newColor: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkColour, setIsDarkColour] = useState(false);
  useEffect(() => {
    if (!color.startsWith('#') || (color.length !== 7 && color.length !== 4)) return
    const hashRemoved = color.substring(1)
    const threeLetter = hashRemoved.length === 3 ? hashRemoved : `${hashRemoved[0]}${hashRemoved[2]}${hashRemoved[4]}`
    setIsDarkColour(threeLetter.toLowerCase().search(/[a-f]/) < 0)
  }, [color])


  return (<>
    <div className="flex flex-row space-x-2 items-center">
      <div className={`text-right`}>{label}:</div>
      { toggle &&
        <input type={`checkbox`} checked={toggle.enabled} onChange={toggle.onChange} className={`border-2 border-stone-400 p-1 mr-2`}/>
      }
      { (toggle && toggle.enabled || !toggle) && <>
        <div
          className="w-40 h-6 border-2 border-stone-400 cursor-pointer rounded-lg font-bold flex justify-center items-center"
          style={{
            backgroundColor: color ? color : "#999999",
            color: isDarkColour ? "#FFFFFF" : "#000000"
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {color ?? "#999999"}
        </div>
      </>}
    </div>
    {isOpen && (
      <div className="rounded-lg">
        <HexColorPicker color={color} onChange={onChange} />
      </div>
    )}
  </>);
}
