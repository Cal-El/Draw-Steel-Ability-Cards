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

  const onChangeColour = (field: keyof ColourSet) => {
    return (newColor: string) => {
      if (newColor === '#NaNNaNNaN') return
      const newBaseColours = {
        ...theme.colourSettings.cardTypeColours,
        [cardType]: {
          ...theme.colourSettings.cardTypeColours[cardType],
          [field]: newColor
        }
      }
      dispatch(modifyAppliedThemeColours({...theme.colourSettings, cardTypeColours: newBaseColours}))
    }
  }

  const onSwitchOverrideOn = (field: keyof ColourSet) => {
    return (e : ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        if (!theme.colourSettings.baseColours) return
        const newBaseColours = {
          ...theme.colourSettings.cardTypeColours,
          [cardType]: {
            ...theme.colourSettings.cardTypeColours[cardType],
            [field]: theme.colourSettings.baseColours[field]
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
      <PopoverPicker label={`Primary Colour`} toggle={{
        enabled: !!theme.colourSettings.cardTypeColours[cardType].primaryColour,
        onChange: onSwitchOverrideOn('primaryColour'),
      }} color={theme.colourSettings.cardTypeColours[cardType]?.primaryColour?.baseColour ?? theme.colourSettings.baseColours?.primaryColour?.baseColour ?? ''} onChange={onChangeColourWithOpacity('primaryColour')}/>
      <PopoverPicker label={`Secondary Colour`} toggle={{
        enabled: !!theme.colourSettings.cardTypeColours[cardType].secondaryColour,
        onChange: onSwitchOverrideOn('secondaryColour'),
      }} color={theme.colourSettings.cardTypeColours[cardType]?.secondaryColour?.baseColour ?? theme.colourSettings.baseColours?.secondaryColour?.baseColour ?? ''} onChange={onChangeColourWithOpacity('secondaryColour')}/>
      <PopoverPicker label={`Background Colour`} toggle={{
        enabled: !!theme.colourSettings.cardTypeColours[cardType].backgroundColour,
        onChange: onSwitchOverrideOn('backgroundColour'),
      }} color={theme.colourSettings.cardTypeColours[cardType]?.backgroundColour ?? theme.colourSettings.baseColours?.backgroundColour ?? ''} onChange={onChangeColour('backgroundColour')}/>
    </div>
  </>)
}
