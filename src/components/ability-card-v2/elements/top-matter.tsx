import {ability_card} from "../../../types/ability-card.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectThemeColours} from "../../../redux/card-settings-slice.ts";
import {getTextColourOnFadedPrimary} from "../utils/color-calculator.ts";

export function TopMatter({card} : { card: ability_card }) {
  const colourSettings = useAppSelector(selectThemeColours);

  return <div id={'top-text'} className={`w-full h-[11pt] flex justify-between pl-[13pt] pt-[0pt] pr-[8pt]`}>
    <div style={{color: getTextColourOnFadedPrimary(card.type, colourSettings), fontSize: '7.5pt', fontWeight: 700}}>{card.header.topMatter}</div>
    <div style={{color: getTextColourOnFadedPrimary(card.type, colourSettings), fontSize: '7.5pt', fontWeight: 700}}>{card.type}</div>
  </div>
}
