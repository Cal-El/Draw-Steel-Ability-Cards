import {abilityTypeValues} from "../../types/ability-card";
import CardTypeColourMenu from "./card-type-colour-menu";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectAppliedTheme} from "../../redux/card-settings-slice.ts";
import {useEffect, useState} from "react";
import {getCardStylesAndPosition} from "../../utils/card-settings-utils.ts";
import {BiLock} from "react-icons/bi";
import { getBackgroundColor, getPrimaryColor, getTextColourOnBackground } from "../ability-card-v2/utils/color-calculator.ts";
import { getTextColourOnPrimary } from "../ability-card/utils/color-calculator.ts";

export function CardTypesColourMenu(){
  const theme = useAppSelector(selectAppliedTheme)
  const [styleState, setStyleState] = useState(getCardStylesAndPosition(theme))
  const [selectedCardType, setSelectedCardType] = useState('main action')
  useEffect(() => {
    setStyleState(getCardStylesAndPosition(theme))
  }, [theme])

  function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

  return (
  <div className={`w-full py-2`}>
    <div className={`w-full flex items-center`}>
        <hr className={`flex-grow border-gray-300`}/>
        <span className={`text-xs small-caps font-bold pb-1 flex-none flex items-center gap-[2pt]`}>Theme Colours per-Type Overrides</span>
        <hr className={`flex-grow border-gray-300`}/>
      </div>
      { styleState.isInbuiltTheme ?
        <div className={`w-full flex gap-[2pt] justify-center items-center border-[2pt] border-dashed border-stone-400 bg-stone-300 rounded-lg p-[5pt] text-center font-bold text-stone-400`}>
          <BiLock/> Theme Colours are locked for built-in themes.
        </div> :
        <div>
          <div className="grid grid-cols-4">
            {abilityTypeValues.map(s => s.toLowerCase()).map(t =>
              <button className="border-2 rounded-md text-sm small-caps m-1 h-12" 
                style={{borderColor: getPrimaryColor(t, theme.colourSettings), 
                  backgroundColor: t === selectedCardType ? getPrimaryColor(t, theme.colourSettings, 60) : getBackgroundColor(t, theme.colourSettings), 
                  color: t === selectedCardType ? getTextColourOnPrimary(t, theme.colourSettings) : getTextColourOnBackground(t, theme.colourSettings)}}
                onClick={() => setSelectedCardType(t)}>
                  {toTitleCase(t)}
              </button>
            )}
          </div>
          <div className={`py-2`}>
            <div className={`w-full flex items-center`}>
              <hr className={`flex-grow border-gray-300`}/>
              <span className={`text-xs small-caps font-bold pb-1 flex-none flex items-center gap-[2pt]`}>{toTitleCase(selectedCardType)} Colours</span>
              <hr className={`flex-grow border-gray-300`}/>
            </div>
            {abilityTypeValues.map(s => s.toLowerCase()).map(t =>
              <CardTypeColourMenu cardType={t} key={t} selected={t === selectedCardType}/>
            )}
          </div>
        </div>
      }
  </div>
  )
}
