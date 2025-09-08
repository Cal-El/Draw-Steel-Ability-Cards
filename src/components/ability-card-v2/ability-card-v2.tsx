import {ability_card} from "../../types/ability-card.ts";
import AbilityCardback from "./ability-cardback.tsx";
import {HeroData} from "../../types/character-data.ts";
import {UpperHeader} from "./elements/upper-header.tsx";
import {LowerHeader} from "./elements/lower-header.tsx";
import {TopMatter} from "./elements/top-matter.tsx";
import {Body} from "./elements/body.tsx";

export default function AbilityCardV2({id, card, heroData, enlargedState}: {id: string, card: ability_card, heroData: HeroData, enlargedState: number}) {
  return <div id={`${id}_${card.header.title}_card`} className={`font-v2Card flex-none flex justify-center items-center print:h-[180pt] print:w-[252pt] ${enlargedState > 0 ? 'h-[360pt] w-[504pt]' : enlargedState < 0 ? 'h-[180pt] w-[252pt]' : 'h-[270pt] w-[378pt]'}`}>
    <div className={`h-[180pt] w-[252pt] print:scale-[1] ${enlargedState > 0 ? 'scale-[2]' : enlargedState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}>
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <AbilityCardback card={card} />
      </div>
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <TopMatter card={card}/>
        <UpperHeader card={card}/>
        <LowerHeader card={card} heroData={heroData}/>
        <Body card={card} heroData={heroData}/>
      </div>
    </div>
  </div>
}
