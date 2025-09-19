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
      <div>
        <div className={`w-full flex gap-2 items-center`}>
          <hr className={`flex-grow border-gray-300`}/>
          <span className={`text-xs small-caps font-bold pb-1 flex-none flex items-center gap-[2pt]`}>Theme Base Colours</span>
          <hr className={`flex-grow border-gray-300`}/>
        </div>
        { styleState.isInbuiltTheme ?
          <div className={`w-full flex gap-[2pt] justify-center items-center border-[2pt] border-dashed border-stone-400 bg-stone-300 rounded-lg p-[5pt] text-center font-bold text-stone-400`}>
            <BiLock/> Theme Colours are locked for built-in themes.
          </div> :
          <div className={`flex flex-col gap-2 mb-4`}>
            <div className="flex flex-row items-center gap-2 h-14">
              <div className={`text-right`}>Keyword Colour:</div>
              <PopoverPicker color={theme.colourSettings.baseColours?.keywordColour?.baseColour ?? ""} onChange={onChangeBaseColourWithOpacity('keywordColour')}/>
            </div>
            <div className="flex flex-row items-center gap-2 h-14">
              <div className={`text-right`}>Background Colour:</div>
              <PopoverPicker color={theme.colourSettings.baseColours?.backgroundColour ?? ""} onChange={onChangeBaseColour('backgroundColour')}/>
            </div>
          </div>
        }
      </div>
  </>)
}
