import {ability_card, effect, power_roll, spacer} from "../../../types/ability-card.ts";
import {HeroData} from "../../../types/character-data.ts";
import {BodyEffect} from "./body-effect.tsx";
import {BodySpacer} from "./body-spacer.tsx";
import {BodyPowerRoll} from "./body-power-roll.tsx";

export function Body({card, heroData} : { card: ability_card, heroData: HeroData }) {
  return <>
    {card.body.map(b => {
      if ((b as effect).isEffect) {
        return <BodyEffect card={card} b={b as effect}/>
      }
      if ((b as spacer).isSpacer) {
        return <BodySpacer b={b as spacer}/>
      }
      if ((b as power_roll).isPowerRoll) {
        return <BodyPowerRoll card={card} heroData={heroData} b={b as effect}/>
      }
    })}

  </>
}
