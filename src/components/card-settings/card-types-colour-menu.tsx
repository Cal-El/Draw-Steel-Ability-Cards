import {abilityTypeValues} from "../../types/ability-card";
import CardTypeColourMenu from "./card-type-colour-menu";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectAppliedTheme} from "../../redux/card-settings-slice.ts";
import {useEffect, useState} from "react";
import {getCardStylesAndPosition} from "../../utils/card-settings-utils.ts";
import {BiLock} from "react-icons/bi";

export function CardTypesColourMenu(){
  const theme = useAppSelector(selectAppliedTheme)
  const [styleState, setStyleState] = useState(getCardStylesAndPosition(theme))
  useEffect(() => {
    setStyleState(getCardStylesAndPosition(theme))
  }, [theme])

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
        <div className={`py-2`}>
          {abilityTypeValues.map(s => s.toLowerCase()).map(t =>
            <CardTypeColourMenu cardType={t} key={t}/>
          )}
        </div>
      }
  </div>
  )
}
