import { getDynamicColor40 } from "../../../../../utils/color-calculator.ts";
import {
  abilityTypeValues,
  characteristic, damage,
  power_roll_tier
} from "../../../../../types/ability-card.ts";
import {EditCharacteristicInput, EditTextInput} from "../../common-editor-elements.tsx";
import {SegmentProps, SetTier} from "./power-roll-tier-body-editor.tsx";
import {useState} from "react";

type DamageDisplayModel = {
  baseValue: string;
  includedKitValue: string;
  characteristicBonusOptions: characteristic[];
  otherBonus: string;
}

const isValueNumber = (s ?: string) => {
  if (!s) {
    return false;
  }
  const x = parseInt(s);
  return !isNaN(x);

}

const toDisplayModel = (d ?: damage) : DamageDisplayModel | undefined => {
  if (!d) {
    return undefined;
  }
  return ({
    baseValue: d.baseValue.toString(),
    includedKitValue: d.includedKitValue.toString(),
    characteristicBonusOptions: d.characteristicBonusOptions ?? [],
    otherBonus: d.otherBonus ?? '',
  } satisfies DamageDisplayModel);
}

function DamageEditor({setTier, tier, tierNum} : {setTier: SetTier, tier: power_roll_tier, tierNum: number}) {
  const defaultDamage : DamageDisplayModel = {
    baseValue: '',
    includedKitValue: '',
    characteristicBonusOptions: [],
    otherBonus: '',
  }
  const [damageDisplay, setDamageDisplay] = useState(toDisplayModel(tier.damage) ?? defaultDamage)
  const [isBaseValueError, setIsBaseValueError] = useState(!isValueNumber(damageDisplay.baseValue));
  const [isIncludedKitValueError, setIsIncludedKitValueError] = useState(!isValueNumber(damageDisplay.includedKitValue));

  const updateDamage = (dd : DamageDisplayModel) => {
    setDamageDisplay(dd);
    setIsBaseValueError(!isValueNumber(dd.baseValue));
    setIsIncludedKitValueError(!isValueNumber(dd.includedKitValue));
    if (isValueNumber(dd.baseValue) && isValueNumber(dd.includedKitValue)) {
      const bVal = parseInt(dd.baseValue);
      const kVal = parseInt(dd.includedKitValue);
      if (kVal <= bVal) {
        const tempTier = {...tier};
        tempTier.damage = {
          baseValue: bVal,
          includedKitValue: kVal,
          characteristicBonusOptions: dd.characteristicBonusOptions,
          otherBonus: dd.otherBonus ?? undefined,
        };
        setTier(tempTier);
      } else {
        setIsIncludedKitValueError(true);
      }
    }
  }

  return (
    <>
      <div className={`col-start-1 col-span-1 row-span-2  w-full`}
           style={{backgroundColor:getDynamicColor40(abilityTypeValues[tierNum - 1])}}/>
      <div className={`flex justify-end items-center`}>
        <div className={`text-right w-[80pt]`}>Base damage:</div>
      </div>
      <input value={damageDisplay.baseValue}
             type={"number"}
             onChange={(e) => {
               updateDamage({...damageDisplay, baseValue: e.target.value})
             }}
             className={`border-2 ${isBaseValueError ? 'border-red-400' : 'border-stone-400'}  p-1 w-[40pt] flex-none text-center`}
      />
      <div className={`flex justify-end items-center`}>
        <div className={`text-right w-[140pt] line-clamp-1`}>including a kit bonus of:</div>
      </div>
      <input value={damageDisplay.includedKitValue}
             type={"number"}
             onChange={(e) => {
               updateDamage({...damageDisplay, includedKitValue: e.target.value})
             }}
             className={`border-2 ${isIncludedKitValueError ? 'border-red-400' : 'border-stone-400'}  p-1 w-[40pt] flex-none text-center`}
      />
      <div className={`col-start-2 col-span-4 grid grid-cols-[1fr_1fr] gap-x-2 gap-y-1`}>
        <EditCharacteristicInput isBold={false}
                                 useSmall={true}
                                 fieldName={'Characteristic Bonus Options'}
                                 fieldValues={damageDisplay.characteristicBonusOptions}
                                 onChange={(e) => {
                                   updateDamage({...damageDisplay, characteristicBonusOptions: e})
                                 }}
        />
        <EditTextInput isBold={false}
                       fieldName={'Other bonuses'}
                       fieldValue={damageDisplay.otherBonus}
                       onChange={(e) => {
                         updateDamage({...damageDisplay, otherBonus: e.target.value})
                       }}
        />
      </div>
    </>
  );
}

export default function TierDamageSegmentEditor({setTier, tier, tierNum} : SegmentProps) {
  const [hasDamage, setHasDamage] = useState(!!tier.damage)

  return(
    <div key={'DamageSegment'} className={`col-span-full grid grid-cols-subgrid gap-x-2 gap-y-1`}>
      <div className={`col-span-full flex justify-start items-center gap-x-2 gap-y-1`}>
        <div className={`font-bold text-right`}>Deals damage:</div>
        <input type={'checkbox'} checked={hasDamage} onChange={(e) => {
          setHasDamage(e.target.checked)
          if (!e.target.checked) {
            setTier({...tier, damage: undefined})
          }
        }} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
      </div>
      {hasDamage && <DamageEditor setTier={setTier} tier={tier} tierNum={tierNum}/>}
    </div>
  );
}
