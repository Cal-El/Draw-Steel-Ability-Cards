import {
    ability_card,
    actionBg40ColorStyle,
    actionBg50ColorStyle,
    actionTextColorStyle,
    distance_block
} from "../../../types/ability-card-types.ts";

function distanceBlock(card: ability_card, block: distance_block, bgColorStyle: Record<string, string>) {
    if (block.distanceValue.length === 1 || block.distanceValue.length === 2) {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[24pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Line of Effect') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[9pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>Line of
                    </div>
                    <div
                        className={`text-[12pt] font-body font-bold text-cardback leading-[8pt] small-caps text-center`}>Effect
                    </div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Special') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[10.5pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Special</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
            <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                <div className={`text-[16.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
            </div>
        </div>
    )
}

export function DistanceBlockList({card}: {card: ability_card}) {
    return (<>
        {card.distance.map((b, i) => distanceBlock(
            card,
            b,
            i % 2 === 0 ? actionBg50ColorStyle : actionBg40ColorStyle
        ))}
    </>);
}