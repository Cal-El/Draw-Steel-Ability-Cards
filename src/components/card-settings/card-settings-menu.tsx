import { ChangeEvent, useState } from "react";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectKeywordColour, updateKeywordColour } from "../../redux/card-settings-slice";
import { PopoverPicker } from "../common/popover-picker";

export default function CardSettingsMenu(){
  const keywordColour = useAppSelector(selectKeywordColour)
  const [customiseKeywordColour, setCustomiseKeywordColour] = useState(!!keywordColour)
  const [keywordColourField, setKeywordColourField] = useState(keywordColour ?? "")
  const dispatch = useAppDispatch()

  const onChangeCustomiseKeywordColour = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomiseKeywordColour(e.target.checked)
    if(!e.target.checked){
      dispatch(updateKeywordColour(""))
    }
  }

  const onChangeKeywordColour = (newColor: string) => {
    setKeywordColourField(newColor)
    dispatch(updateKeywordColour(newColor))
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start gap-2 p-4 overflow-y-scroll h-full scrollbar">
        <SectionSeparator name="Colours"/>
        <div className="w-full pl-4">
          <SectionSeparator name="Keywords"/>
            <div className={`flex justify-start items-center gap-2 col-span-2 h-14`}>
              <div className={`text-right font-bold`}>Custom Keyword Colour:</div>
              <input type={`checkbox`} checked={customiseKeywordColour} onChange={onChangeCustomiseKeywordColour} className={`border-2 border-stone-400 p-1 mr-2`}/>
              {customiseKeywordColour && <>
                <PopoverPicker color={keywordColourField} onChange={onChangeKeywordColour}/>
              </>}
            </div>
        </div>
      </div>
    </>
  )
}
