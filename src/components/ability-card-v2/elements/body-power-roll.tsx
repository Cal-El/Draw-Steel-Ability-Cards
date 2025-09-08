import {ability_card, power_roll, power_roll_tier} from "../../../types/ability-card.ts";
import {HeroData} from "../../../types/character-data.ts";

function Tier({t, tn, card, heroData}: {t: power_roll_tier, tn: number, card: ability_card, heroData: HeroData}) {
  return <>
    <div>T{tn} Damage {t.damage?.baseValue} {t.damage?.characteristicBonusOptions} {t.damage?.otherBonus} {t.damage?.includedKitValue}</div>
    <div>T{tn} Effect {t.baseEffect}</div>
    <div>T{tn} Potency {t.potency?.characteristic} {t.potency?.strength} {t.potency?.effect}</div>
  </>
}

export function BodyPowerRoll({card, heroData, b}: {card: ability_card, heroData: HeroData, b: power_roll}) {
  return <div className={`text-xs`}>
    <div>Power Roll {b.characteristicBonus}</div>
    <Tier t={b.t1} tn={1} card={card} heroData={heroData}/>
    <Tier t={b.t2} tn={2} card={card} heroData={heroData}/>
    <Tier t={b.t3} tn={3} card={card} heroData={heroData}/>
  </div>
}
