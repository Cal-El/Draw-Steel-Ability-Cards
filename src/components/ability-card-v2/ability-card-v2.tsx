import {ability_card} from "../../types/ability-card.ts";
import AbilityCardback from "./ability-cardback.tsx";
import {HeroData} from "../../types/character-data.ts";
import {UpperHeader} from "./elements/upper-header.tsx";
import {LowerHeader} from "./elements/lower-header.tsx";
import {TopMatter} from "./elements/top-matter.tsx";
import {Body} from "./elements/body.tsx";
import {useEffect, useState} from "react";
import {getCardGlyph} from "./utils/glyph-translator.ts";
import {getPrimaryColor} from "./utils/color-calculator.ts";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectThemeColours} from "../../redux/card-settings-slice.ts";

export default function AbilityCardV2({id, card, heroData, enlargedState}: {id: string, card: ability_card, heroData: HeroData, enlargedState: number}) {
  const colourSettings = useAppSelector(selectThemeColours);

  const [glyph, setCardGlyph] = useState(getCardGlyph(card));
  useEffect(() => {
    setCardGlyph(getCardGlyph(card));
  }, [card])

  return <div id={`${id}_${card.header.title}_card`} className={`font-v2Card flex-none flex justify-center items-center print:h-[180pt] print:w-[252pt] ${enlargedState > 0 ? 'h-[360pt] w-[504pt]' : enlargedState < 0 ? 'h-[180pt] w-[252pt]' : 'h-[270pt] w-[378pt]'}`}>
    <div className={`h-[180pt] w-[252pt] print:scale-[1] ${enlargedState > 0 ? 'scale-[2]' : enlargedState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}>
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <AbilityCardback card={card} />
      </div>
      {glyph && <div className={`h-[180pt] w-[252pt] absolute top-0 flex justify-end`}>
        <div style={{color: getPrimaryColor(card.type, colourSettings, 10), fontSize: '56pt', lineHeight: '66pt', fontWeight: 700, fontFamily: 'DS Open Glyphs'}}>{glyph}</div>
      </div>}
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <TopMatter card={card}/>
        <UpperHeader card={card}/>
        <LowerHeader card={card} heroData={heroData}/>
        <Body card={card} heroData={heroData}/>
      </div>
    </div>
  </div>
}
