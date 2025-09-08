import {ability_card} from "../../../types/ability-card.ts";
import {HeroData} from "../../../types/character-data.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectColourSettings} from "../../../redux/card-settings-slice.ts";
import {
  getTextColourOnBackground,
} from "../utils/color-calculator.ts";
import {DistanceLine} from "./distance-line.tsx";
import {KeywordsLine} from "./keywords-line.tsx";

export function LowerHeader({card, heroData} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div className={``}>
    <KeywordsLine card={card} heroData={heroData}/>
    {(card.header.distance.display || card.header.distance.display) && <div id={'target-and-distance'} className={`pl-[13pt] pr-[7pt] w-full flex justify-between mt-[1pt] mb-[2pt]`}>
      <DistanceLine card={card} heroData={heroData} />
      {card.header.target && <div style={{color: getTextColourOnBackground(card.type, colourSettings), fontWeight: 'bold', lineHeight: '8.5pt', fontSize: '8.5pt'}} className={`w-full text-right flex justify-end items-center`}>
        <span className={`font-dsGlyphs font-normal leading-none text-[11pt]`}>T</span>{card.header.target}
      </div>}
    </div>}
  </div>
}
