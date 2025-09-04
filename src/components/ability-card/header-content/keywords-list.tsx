import { selectKeywordColour } from "../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../redux/hooks.ts";
import {ability_card} from "../../../types/ability-card-types.ts";
import { getKeywordColor } from "../../../utils/color-calculator.ts";

export function KeywordsList({card}: {card: ability_card}) {
  const keywordColour = useAppSelector(selectKeywordColour)

  if (!card.keywords.length) return <></>
  return (
      <div className={`flex w-full gap-x-[1.9pt]`}>
          {card.keywords.map((k) => (
              <div className={`flex h-[10pt] min-w-[30pt] py-[0.5pt] px-[1.5pt] justify-items-center`} 
                style={{backgroundColor: getKeywordColor(keywordColour)}}>
                  <h3 className={`text-[9pt] leading-none w-full font-display small-caps text-cardback text-center justify-center align-middle`}>{k}</h3>
              </div>
          ))}
      </div>
  );
}
