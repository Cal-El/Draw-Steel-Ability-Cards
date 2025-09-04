import {ability_card, abilityTypeValues, power_roll, power_roll_tier} from "../../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../../types/card-list.ts";
import {
  getDynamicColor20,
  getDynamicColorBase
} from "../../../../../utils/color-calculator.ts";
import TierDamageSegmentEditor from "./tier-damage-segment-editor.tsx";
import TierBaseEffectEditor from "./tier-base-effect-editor.tsx";
import TierPotencySegmentEditor from "./tier-potency-segment-editor.tsx";

export type SetTier = (t:power_roll_tier) => void;
export type SegmentProps = {
  tier: power_roll_tier,
  tierNum: number,
  setTier: SetTier,
}

export default function PowerRollTierBodyEditor({tier, tierNum, card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number, tier: power_roll_tier, tierNum: number}) {

  const setTier: SetTier = (t: power_roll_tier) => {
    const temp = [...card.body]
    const tempPr : power_roll = {...temp[bodyIdx] as power_roll}
    if (tierNum === 1) {
      tempPr.t1 = t;
    }
    if (tierNum === 2) {
      tempPr.t2 = t;
    }
    if (tierNum === 3) {
      tempPr.t3 = t;
    }
    temp[bodyIdx] = tempPr;
    setCard({...card, body: temp})
  }
  const props : SegmentProps = {
    setTier: setTier,
    tier: tier,
    tierNum: tierNum,
  } satisfies SegmentProps;

  return (<>
    <div className={`col-span-full grid grid-cols-subgrid gap-y-2 gap-x-0`}>
      <div className={`col-span-1 text-lg font-bold flex justify-end items-center p-2 w-full`}
        style={{color: getDynamicColorBase(abilityTypeValues[tierNum-1], {})}}>
        {tierNum === 1 ? '≤11' : tierNum === 2 ? '12-16' : '17+'}
      </div>
      <div className={`col-span-3 border-l-[2pt] grid grid-cols-[2pt_min-content_min-content_1fr_min-content] auto-cols-min gap-x-2 gap-y-1 p-2`}
        style={{borderColor: getDynamicColorBase(abilityTypeValues[tierNum-1], {}), backgroundColor: getDynamicColor20(abilityTypeValues[tierNum - 1], {})}}>
        <TierDamageSegmentEditor {...props}/>
        <TierBaseEffectEditor {...props}/>
        <TierPotencySegmentEditor {...props}/>
      </div>
    </div>
  </>);
}
