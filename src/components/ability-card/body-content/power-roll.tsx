import {
  ability_card,
  getDynamicColor20,
  getDynamicColor30,
  getDynamicColor40,
  getDynamicColor50,
  getDynamicColorBase,
  power_roll_statement,
  power_roll_tier
} from "../../../types/ability-card-types.ts";

function powerRollLine(card: ability_card, powerRollTier: power_roll_tier, rowNum: number) {
  const generalEffectFontsize = card.powerRollFontSizeOverride ?
    card.powerRollFontSizeOverride :
    powerRollTier.generalEffect && powerRollTier.generalEffect?.length < 81 || !powerRollTier.hasPotency && powerRollTier.generalEffect && powerRollTier.generalEffect?.length < 161 ? `6pt` : `5pt`
  const potencyEffectFontsize = card.powerRollFontSizeOverride ?
    card.powerRollFontSizeOverride :
    powerRollTier.potencyEffect && powerRollTier.potencyEffect?.length < 81 || !powerRollTier.hasGeneralEffect && powerRollTier.potencyEffect && powerRollTier.potencyEffect?.length < 161 ? `6pt` : `5pt`
  return <div className={`flex w-full h-1/3`}>
        <div className={` w-[5.4pt] h-full flex justify-center`}
             style={{backgroundColor:getDynamicColorBase(card.type)}}>
            <div className={`[writing-mode:vertical-lr] rotate-180 text-[4pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{rowNum === 1 ? '11 or less' : rowNum === 2 ? '12-16' : '17+'}</div>
        </div>
        {powerRollTier.hasDamage ?
            <div className={`relative ${powerRollTier.damageValue !== undefined && powerRollTier.damageValue?.length > 2 ? `w-[28pt]` : `w-[22pt]`} h-full`}
                 style={{backgroundColor: `${rowNum % 2 === 1 ? getDynamicColor50(card.type) : getDynamicColor40(card.type)}`}}>
                <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                     style={{color:getDynamicColorBase(card.type)}}>Damage</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.damageValue}</div>
                </div>
            </div>: <></>
        }
        {powerRollTier.hasGeneralEffect ?
            <div className={`flex-1 flex h-full`}
                 style={{backgroundColor: `${rowNum % 2 === 1 ? getDynamicColor20(card.type) : getDynamicColor30(card.type)}`}}>
                <div className={`h-full flex-1 flex flex-col justify-center pl-[2.3333pt] pr-[0.6667pt]`}>
                    <div className={`font-body leading-none text-left`}
                         style={{color:getDynamicColorBase(card.type), fontSize: generalEffectFontsize}}>{powerRollTier.generalEffect}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`relative w-[28pt] h-full`}
                 style={{backgroundColor: `${rowNum % 2 === 1 ? getDynamicColor40(card.type) : getDynamicColor50(card.type)}`}}>
              <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                     style={{color:getDynamicColorBase(card.type)}}>Potency</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.potencyValue}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`flex-1 flex h-full`}
                 style={{backgroundColor: `${rowNum % 2 === 1 ? getDynamicColor20(card.type) : getDynamicColor30(card.type)}`}}>
                <div className={`h-full flex-1 flex flex-col justify-center pl-[2.3333pt] pr-[0.6667pt]`}>
                    <div className={`font-body leading-none text-left`}
                         style={{color:getDynamicColorBase(card.type), fontSize: potencyEffectFontsize}}>{powerRollTier.potencyEffect}</div>
                </div>
            </div> : <></>
        }
    </div>
}

export function PowerRollStatement({card, powerRoll}: {card: ability_card, powerRoll: power_roll_statement}) {
    return (
        <div className={`flex-none flex flex-col h-[76pt] justify-center gap-y-[2pt]`}>
            <div className={`flex h-[8pt]`}>
                <div className={`w-[2pt]`}></div>
                <p className={`text-[9pt] font-body leading-none`}
                   style={{color:getDynamicColorBase(card.type)}}>
                  <b>Power Roll {parseInt(powerRoll.characteristic) < 0 ? `- ${parseInt(powerRoll.characteristic) * -1}` : `+ ${powerRoll.characteristic}`}:</b>
                </p>
            </div>
            <div className={`flex flex-col w-full h-[66pt]`}>
                {powerRollLine(card, powerRoll.t1, 1)}
                {powerRollLine(card, powerRoll.t2, 2)}
                {powerRollLine(card, powerRoll.t3, 3)}
            </div>
        </div>
    )
}
