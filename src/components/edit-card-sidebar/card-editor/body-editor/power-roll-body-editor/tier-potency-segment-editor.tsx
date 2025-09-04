import {
  abilityTypeValues,
  all_characteristics, all_potency_strength,
  characteristic, potency, potency_strength,
  power_roll_tier,
} from "../../../../../types/ability-card.ts";
import {SegmentProps, SetTier} from "./power-roll-tier-body-editor.tsx";
import {useState} from "react";
import { getDynamicColor40 } from "../../../../../utils/color-calculator.ts";

type PotencyDisplayModel = {
  characteristic?: characteristic;
  strength?: potency_strength;
  effect: string;
}

function PotencyEditor({setTier, tier, tierNum} : {setTier: SetTier, tier: power_roll_tier, tierNum: number}) {

  const defaultPotency : PotencyDisplayModel = { effect: '' }
  const [potencyDisplay, setPotencyDisplay] = useState(tier.potency ?? defaultPotency)
  const [isCharacteristicError, setIsCharacteristicError] = useState(potencyDisplay.characteristic === undefined);
  const [isStrengthError, setIsStrengthError] = useState(potencyDisplay.strength === undefined);

  const updatePotency = (pd : PotencyDisplayModel) => {
    setPotencyDisplay(pd);
    setIsCharacteristicError(pd.characteristic === undefined);
    setIsStrengthError(pd.strength === undefined);
    if (pd.characteristic !== undefined && pd.strength !== undefined) {
      const tempTier = {...tier};
      tempTier.potency = pd as potency;
      setTier(tempTier);
      return;
    }
  }

  return (<>
    <div className={`col-start-1 col-span-1 row-span-2  w-full`}
         style={{backgroundColor:getDynamicColor40(abilityTypeValues[tierNum - 1], {}, {})}}/>
    <div className={`col-span-4 flex items-center gap-x-2 gap-y-1`}>
      <div className={``}>If</div>
      <select value={potencyDisplay.characteristic}
              onChange={(e) => {
                updatePotency({...potencyDisplay, characteristic: e.target.value ? e.target.value as characteristic : undefined})
              }}
              className={`border-2 ${isCharacteristicError ? 'border-red-400' : 'border-stone-400'} p-1`}>
        <option value={undefined}>-</option>
        {all_characteristics.map(x => <option>{x}</option>)}
      </select>
      <div className={``}>is less than</div>
      <select value={potencyDisplay.strength}
              onChange={(e) => {
                updatePotency({...potencyDisplay, strength: e.target.value ? all_potency_strength[parseInt(e.target.value)] : undefined})
              }}
              className={`border-2 ${isStrengthError ? 'border-red-400' : 'border-stone-400'} p-1`}>
        <option value={undefined}>-</option>
        <option value={0}>Weak</option>
        <option value={1}>Average</option>
        <option value={2}>Strong</option>
      </select>
    </div>
    <div className={`col-span-4 flex items-center gap-2`}>
      <div className={`text-right`}>Potency effect:</div>
      <input value={potencyDisplay.effect}
             onChange={(e) => {
               updatePotency({...potencyDisplay, effect: e.target.value})
             }}
             className={`flex-grow border-2 border-stone-400 p-1`}></input>
    </div>
  </>);
}

export default function TierPotencySegmentEditor({setTier, tier, tierNum} : SegmentProps) {
  const [hasPotency, setHasPotency] = useState(!!tier.potency)

  return(
    <div key={'PotencySegment'} className={`col-span-full grid grid-cols-subgrid gap-x-2 gap-y-1`}>
      <div className={`col-span-full flex justify-start items-center gap-x-2 gap-y-1`}>
        <div className={`font-bold text-right`}>Has potency effect:</div>
        <input type={'checkbox'} checked={hasPotency} onChange={(e) => {
          setHasPotency(e.target.checked)
          if (!e.target.checked) {
            setTier({...tier, potency: undefined})
          }
        }} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
      </div>
      {hasPotency && <PotencyEditor key={`editor`} setTier={setTier} tier={tier} tierNum={tierNum}/>}
    </div>
  );
}
