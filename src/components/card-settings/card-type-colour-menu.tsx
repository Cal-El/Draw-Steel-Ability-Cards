import {ChangeEvent} from "react";
import {
  modifyAppliedThemeColours,
  selectAppliedTheme,
} from "../../redux/card-settings-slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PopoverPicker } from "../common/popover-picker";
import {ColourSet} from "../../types/card-settings.ts";

export default function CardTypeColourMenu({cardType}: {cardType: string}){
  const theme = useAppSelector(selectAppliedTheme)
  const dispatch = useAppDispatch()

  const onChangeColourWithOpacity = (field: keyof ColourSet) => {
    return (newColor: string) => {
      if (newColor === '#NaNNaNNaN') return
      const newBaseColours = {
        ...theme.colourSettings.cardTypeColours,
        [cardType]: {
          ...theme.colourSettings.cardTypeColours[cardType],
          [field]: {
            baseColour: newColor
          }
        }
      }
      dispatch(modifyAppliedThemeColours({...theme.colourSettings, cardTypeColours: newBaseColours}))
    }
  }

  const onSwitchOverrideOn = (field: keyof ColourSet) => {
    return (e : ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const newBaseColours = {
          ...theme.colourSettings.cardTypeColours,
          [cardType]: {
            ...theme.colourSettings.cardTypeColours[cardType],
            [field]: {...theme.colourSettings.baseColours?.primaryColour}
          }
        }
        dispatch(modifyAppliedThemeColours({...theme.colourSettings, cardTypeColours: newBaseColours}))
      } else {
        const newBaseColours = {
          ...theme.colourSettings.cardTypeColours,
          [cardType]: {
            ...theme.colourSettings.cardTypeColours[cardType],
            [field]: undefined
          }
        }
        dispatch(modifyAppliedThemeColours({...theme.colourSettings, cardTypeColours: newBaseColours}))
      }
    }
  }

  return (<>
    <div>
        <div className={`flex justify-start items-center gap-2 col-span-2 h-14`}>
          <div className={`text-right`}>Base Colour:</div>
          <input type={`checkbox`} checked={!!theme.colourSettings.cardTypeColours[cardType].primaryColour} onChange={onSwitchOverrideOn('primaryColour')} className={`border-2 border-stone-400 p-1 mr-2`}/>
          {!!theme.colourSettings?.cardTypeColours[cardType]?.primaryColour && <>
            <PopoverPicker color={theme.colourSettings.cardTypeColours[cardType]?.primaryColour?.baseColour ?? theme.colourSettings.baseColours?.primaryColour?.baseColour ?? ''} onChange={onChangeColourWithOpacity('primaryColour')}/>
          </>}
        </div>
    </div>
  </>)
}
