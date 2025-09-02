import { useState, ChangeEvent } from "react";
import { selectKeywordColour, updateKeywordColour } from "../../redux/card-settings-slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { PopoverPicker } from "../common/popover-picker";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";

export default function KeywordColourMenu(){
  const keywordColour = useAppSelector(selectKeywordColour)
  const [customiseKeywordColour, setCustomiseKeywordColour] = useState(!!keywordColour)
  const [keywordColourField, setKeywordColourField] = useState(keywordColour ?? "")
  const dispatch = useAppDispatch()

  const onChangeCustomiseKeywordColour = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomiseKeywordColour(e.target.checked)
    if(!e.target.checked){
      dispatch(updateKeywordColour(""))
    } else {
      dispatch(updateKeywordColour(keywordColourField))
    }
  }

  const onChangeKeywordColour = (newColor: string) => {
    setKeywordColourField(newColor)
    dispatch(updateKeywordColour(newColor))
  }
  
  return (
    <div>
      <SectionSeparator name="Keywords"/>
      <div className={`flex justify-start items-center gap-2 col-span-2 h-14`}>
        <div className={`text-right`}>Custom Keyword Colour:</div>
        <input type={`checkbox`} checked={customiseKeywordColour} onChange={onChangeCustomiseKeywordColour} className={`border-2 border-stone-400 p-1 mr-2`}/>
        {customiseKeywordColour && <>
          <PopoverPicker color={keywordColourField} onChange={onChangeKeywordColour}/>
        </>}
      </div>
    </div>
  )
}
