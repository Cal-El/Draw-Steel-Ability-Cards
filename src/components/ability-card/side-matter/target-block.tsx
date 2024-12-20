import {ability_card, actionTextColorStyle} from "../../../types/ability-card-types.ts";

export function TargetBlock({card, bgColorStyle}: {card: ability_card, bgColorStyle: Record<string, string>}) {
    if (card.target === '1 Creature or Object') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full  pt-[5pt]`}>
                    <div
                        className={`text-[24pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>1
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-[5pt] small-caps text-center`}>Creature
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>or
                        Object
                    </div>
                </div>
            </div>
        )
    } else if (card.target === '1 Creature') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[2pt]`}>
                    <div
                        className={`text-[24pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>1
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creature
                    </div>
                </div>
            </div>
        )
    } else if (card.target === 'Self and All Creatures') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[7pt]`}>
                    <div
                        className={`text-[16.5pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Self
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>and All
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creatures
                    </div>
                </div>
            </div>
        )
    } else if (card.target === 'Special') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[3pt]`}>
                    <div
                        className={`text-[10.5pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Special
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[16.5pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>{card.target}
                    </div>
                </div>
            </div>
        )
    }
}