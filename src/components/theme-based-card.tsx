import {ability_card} from "../types/ability-card.ts";
import {v1StyleName} from "./ability-card/constants.ts";
import AbilityCard from "./ability-card/ability-card.tsx";
import {DowngradeCard} from "../utils/ability-card-downgrader.ts";
import {HeroData} from "../types/character-data.ts";
import {v2StyleName} from "./ability-card-v2/constants.ts";
import AbilityCardV2 from "./ability-card-v2/ability-card-v2.tsx";
import {useAppSelector} from "../redux/hooks.ts";
import {selectAppliedTheme} from "../redux/card-settings-slice.ts";

export function ThemeBasedCard({id, c, hd, enlargedState} : {id: string, c: ability_card, hd?: HeroData, enlargedState: -1 | 0 | 1}) {
  const theme = useAppSelector(selectAppliedTheme);

  switch (theme.cardDesign) {
    case v1StyleName: return <AbilityCard id={id} card={DowngradeCard(c, hd ?? new HeroData({}))} enlargedState={enlargedState}/>
    case v2StyleName:
    default: return <AbilityCardV2 id={id} card={c} heroData={hd ?? new HeroData({})} enlargedState={enlargedState} />
  }
}
