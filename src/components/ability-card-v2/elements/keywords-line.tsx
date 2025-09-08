import {ability_card} from "../../../types/ability-card.ts";
import {HeroData} from "../../../types/character-data.ts";
import {getKeywordColor, getKeywordTextColor} from "../utils/color-calculator.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectColourSettings} from "../../../redux/card-settings-slice.ts";

export function KeywordsLine({card} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div id={`keywords`} className={`pl-[13pt] flex gap-[2pt]`}>
    {card.header.keywords.map(k => {
      return <div key={k}
                  style={{
                    borderColor: getKeywordColor(card.type, colourSettings, 100),
                    backgroundColor: getKeywordColor(card.type, colourSettings, 20),
                    color: getKeywordTextColor(card.type, colourSettings),
                  }}
                  className={`min-w-[25pt] px-[2pt] border-[1pt] rounded-[2pt] border-orange-200 bg-orange-50 text-[7pt] text-gray-600 text-center font-bold leading-none py-[0.5pt]`}
      >
        {k}
      </div>
    })}
  </div>
}
