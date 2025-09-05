import { useState, ChangeEvent } from "react";
import { selectBaseColours, updateBaseColours } from "../../redux/card-settings-slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { PopoverPicker } from "../common/popover-picker";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import { ColourSet } from "../../types/card-settings";

export default function BaseColourMenu(){
  const baseColours = useAppSelector(selectBaseColours)
  const [customiseKeywordColour, setCustomiseKeywordColour] = useState(!!baseColours?.keywordColour)
  const [customiseBackgroundColour, setCustomiseBackgroundColour] = useState(!!baseColours?.backgroundColour)
  const [customBaseColours, setBaseColours] = useState<ColourSet>(baseColours ?? {})
  const dispatch = useAppDispatch()

  const onChangeCustomiseKeywordColour = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomiseKeywordColour(e.target.checked)
    if(!e.target.checked){
      dispatchChangeBaseColour('keywordColour', '')
    } else {
      dispatchChangeBaseColour('keywordColour', customBaseColours.keywordColour ?? "")
    }
  }

  const onChangeCustomiseBackgroundColour = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomiseBackgroundColour(e.target.checked)
    if(!e.target.checked){
      dispatchChangeBaseColour('backgroundColour', "")
    } else {
      dispatchChangeBaseColour('keywordColour', customBaseColours.backgroundColour ?? "")
    }
  }

  const onChangeBaseColour = (field: keyof ColourSet) => {
    return (newColor: string) => {
      const newBaseColours = {
        ...baseColours,
        [field]: newColor
      }
      setBaseColours(newBaseColours)
      dispatch(updateBaseColours(newBaseColours))
    }
  }

  const dispatchChangeBaseColour = (field: keyof ColourSet, value: string) => {
    const newBaseColours = {
        ...baseColours,
        [field]: value
      }
      dispatch(updateBaseColours(newBaseColours))
  }
  
  return (
    <div>
      <SectionSeparator name="Base"/>
      <div className={`flex flex-col gap-2 mb-4`}>
        <div className="flex flex-row items-center gap-2 h-14">
          <div className={`text-right`}>Keyword Colour:</div>
          <input type={`checkbox`} checked={customiseKeywordColour} onChange={onChangeCustomiseKeywordColour} className={`border-2 border-stone-400 p-1 mr-2`}/>
          {customiseKeywordColour && <>
            <PopoverPicker color={baseColours?.keywordColour ?? ""} onChange={onChangeBaseColour('keywordColour')}/>
          </>}
        </div>
        <div className="flex flex-row items-center gap-2 h-14">
          <div className={`text-right`}>Background Colour:</div>
          <input type={`checkbox`} checked={customiseBackgroundColour} onChange={onChangeCustomiseBackgroundColour} className={`border-2 border-stone-400 p-1 mr-2`}/>
          {customiseBackgroundColour && <>
            <PopoverPicker color={baseColours?.backgroundColour ?? ""} onChange={onChangeBaseColour('backgroundColour')}/>
          </>}
        </div>
      </div>
    </div>
  )
}
