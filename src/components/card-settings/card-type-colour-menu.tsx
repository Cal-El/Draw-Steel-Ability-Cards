import { ChangeEvent, useState } from "react";
import { selectCardTypeSettingsByCardType, updateCardTypeSettings } from "../../redux/card-settings-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import { PopoverPicker } from "../common/popover-picker";

export default function CardTypeColourMenu({cardType}: {cardType: string}){
  const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(cardType))
  const [customiseCardTypeColours, setCustomiseCardTypeColours] = useState(!!cardTypeSettings)
  const [baseColourField, setBaseColourField] = useState(cardTypeSettings?.baseColour ?? "")
  const dispatch = useAppDispatch()

  const onChangeCustomiseCardTypeColours = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomiseCardTypeColours(e.target.checked)
    if(!e.target.checked){
      dispatch(updateCardTypeSettings({cardType: cardType, cardSettings: undefined}))
    } else {
      dispatch(updateCardTypeSettings({cardType: cardType, cardSettings: {baseColour: baseColourField}}))
    }
  }

  const onChangeBaseColour = (newColor: string) => {
    setBaseColourField(newColor)
    dispatch(updateCardTypeSettings({cardType: cardType, cardSettings: {baseColour: newColor}}))
  }

  return (
    <>
      <SectionSeparator key={cardType} name={cardType}/>
      <div className={`flex justify-start items-center gap-2 col-span-2 h-14`}>
        <div className={`text-right`}>Base Colour:</div>
        <input type={`checkbox`} checked={customiseCardTypeColours} onChange={onChangeCustomiseCardTypeColours} className={`border-2 border-stone-400 p-1 mr-2`}/>
        {customiseCardTypeColours && <>
          <PopoverPicker color={baseColourField} onChange={onChangeBaseColour}/>
        </>}
      </div>
    </>
  )
}
