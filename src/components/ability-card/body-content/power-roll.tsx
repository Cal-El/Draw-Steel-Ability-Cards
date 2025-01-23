import {
    ability_card,
    actionBg100ColorStyle, actionBg20ColorStyle, actionBg30ColorStyle, actionBg40ColorStyle, actionBg50ColorStyle,
    actionTextColorStyle,
    power_roll_statement,
    power_roll_tier
} from "../../../types/ability-card-types.ts";

function powerRollLine(card: ability_card, powerRollTier: power_roll_tier, rowNum: number) {
    return <div className={`flex w-full`}>
        <div className={`${actionBg100ColorStyle[card.type]} w-[8.1pt] h-[32.4pt] flex justify-center`}>
            <div className={`[writing-mode:vertical-lr] rotate-180 text-[6pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{rowNum === 1 ? '11 or less' : rowNum === 2 ? '12-16' : '17+'}</div>
        </div>
        {powerRollTier.hasDamage ?
            <div className={`relative  ${rowNum % 2 === 1 ? actionBg50ColorStyle[card.type] : actionBg40ColorStyle[card.type]} ${powerRollTier.damageValue !== undefined && powerRollTier.damageValue?.length > 2 ? `w-[42.4pt]` : `w-[32.4pt]`} h-[32.4pt]`}>
                <div className={`absolute top-0 left-0 text-[6.75pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Damage</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[18pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.damageValue}</div>
                </div>
            </div>: <></>
        }
        {powerRollTier.hasGeneralEffect ?
            <div className={`${rowNum % 2 === 1 ? actionBg20ColorStyle[card.type] : actionBg30ColorStyle[card.type]} flex-1 flex h-[32.4pt]`}>
                <div className={`h-[32.4pt] flex-1 flex flex-col justify-center pl-[3.5pt] pr-[1pt]`}>
                    <div className={`${powerRollTier.generalEffect && powerRollTier.generalEffect?.length < 81 || !powerRollTier.hasPotency ? `text-[9pt]` : `text-[7.5pt]`} font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRollTier.generalEffect}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`relative  ${rowNum % 2 === 1 ? actionBg40ColorStyle[card.type] : actionBg50ColorStyle[card.type]} w-[42.4pt] h-[32.4pt]`}>
                <div className={`absolute top-0 left-0 text-[6.75pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Potency</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[18pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.potencyValue}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`${rowNum % 2 === 1 ? actionBg20ColorStyle[card.type] : actionBg30ColorStyle[card.type]} flex-1 flex h-[32.4pt]`}>
                <div className={`h-[32.4pt] flex-1 flex flex-col justify-center pl-[3.5pt] pr-[1pt]`}>
                    <div className={`${powerRollTier.potencyEffect && powerRollTier.potencyEffect?.length < 81 || !powerRollTier.hasGeneralEffect? `text-[9pt]` : `text-[7.5pt]`} font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRollTier.potencyEffect}</div>
                </div>
            </div> : <></>
        }
    </div>
}

export function PowerRollStatement({card, powerRoll}: {card: ability_card, powerRoll: power_roll_statement}) {
    return (
        <div className={`flex-auto flex flex-col h-[110.7pt] justify-center gap-y-[3pt]`}>
            <div className={`flex`}>
                <div className={`w-[3pt]`}></div>
                <p className={`text-[13.5pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>Power Roll + {powerRoll.characteristic}:</b></p>
            </div>
            <div className={`flex flex-col w-full h-[97.2pt]`}>
                {powerRollLine(card, powerRoll.t1, 1)}
                {powerRollLine(card, powerRoll.t2, 2)}
                {powerRollLine(card, powerRoll.t3, 3)}
            </div>
        </div>
    )
}
