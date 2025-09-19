import {
  modifyAppliedThemeColours,
  selectAppliedTheme
} from "../../redux/card-settings-slice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { PopoverPicker } from "../common/popover-picker";
import { ColourSet } from "../../types/card-settings";
import {useEffect, useState} from "react";
import {getCardStylesAndPosition} from "../../utils/card-settings-utils.ts";
import {BiLock} from "react-icons/bi";

export default function BaseColourMenu(){
  const theme = useAppSelector(selectAppliedTheme)
  const [styleState, setStyleState] = useState(getCardStylesAndPosition(theme))
  useEffect(() => {
    setStyleState(getCardStylesAndPosition(theme))
  }, [theme])
  const dispatch = useAppDispatch()

  const onChangeBaseColour = (field: keyof ColourSet) => {
    return (newColor: string) => {
      if (newColor === '#NaNNaNNaN') return
      const newBaseColours = {
        ...theme.colourSettings.baseColours,
        [field]: newColor
      }
      dispatch(modifyAppliedThemeColours({...theme.colourSettings, baseColours: newBaseColours}))
    }
  }

  const onChangeBaseColourWithOpacity = (field: keyof ColourSet) => {
    return (newColor: string) => {
      if (newColor === '#NaNNaNNaN') return
      const newBaseColours = {
        ...theme.colourSettings.baseColours,
        [field]: {baseColour: newColor},
      }
      dispatch(modifyAppliedThemeColours({...theme.colourSettings, baseColours: newBaseColours}))
    }
  }
  
  return (<>
      <div className={`w-full py-2`}>
        <div className={`w-full flex gap-2 items-center`}>
          <hr className={`flex-grow border-gray-300`}/>
          <span className={`text-xs small-caps font-bold pb-1 flex-none flex items-center gap-[2pt]`}>Theme Base Colours</span>
          <hr className={`flex-grow border-gray-300`}/>
        </div>
        { styleState.isInbuiltTheme ?
          <div className={`w-full flex gap-[2pt] justify-center items-center border-[2pt] border-dashed border-stone-400 bg-stone-300 rounded-lg p-[5pt] text-center font-bold text-stone-400`}>
            <BiLock/> Theme Colours are locked for built-in themes.
          </div> :
          <div className={`w-full flex flex-col items-center`}>
            <PopoverPicker label={`Primary Colour`} color={theme.colourSettings.baseColours?.primaryColour?.baseColour ?? ""} onChange={onChangeBaseColourWithOpacity('primaryColour')}/>
            <PopoverPicker label={`Secondary Colour`} color={theme.colourSettings.baseColours?.secondaryColour?.baseColour ?? ""} onChange={onChangeBaseColourWithOpacity('secondaryColour')}/>
            <PopoverPicker label={`Keyword Colour`} color={theme.colourSettings.baseColours?.keywordColour?.baseColour ?? ""} onChange={onChangeBaseColourWithOpacity('keywordColour')}/>
            <PopoverPicker label={`Background Colour`} color={theme.colourSettings.baseColours?.backgroundColour ?? ""} onChange={onChangeBaseColour('backgroundColour')}/>
            <PopoverPicker label={`Text Colour on Primary`} color={theme.colourSettings.baseColours?.textColourOnPrimary ?? ""} onChange={onChangeBaseColour('textColourOnPrimary')}/>
            <PopoverPicker label={`Text Colour on Primary (Faded)`} color={theme.colourSettings.baseColours?.textColourOnFadedPrimary ?? ""} onChange={onChangeBaseColour('textColourOnFadedPrimary')}/>
          </div>
        }
      </div>
  </>)
}
