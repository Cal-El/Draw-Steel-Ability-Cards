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
            <div className={`relative  ${bgColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[16pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Line of Effect') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[6pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Line of
                    </div>
                    <div
                        className={`text-[8pt] font-body font-bold text-cardback leading-[5.3333pt] small-caps text-center`}>Effect
                    </div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Special') {
        return (
            <div className={`relative  ${bgColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[7pt] font-body font-bold text-cardback leading-[5.3333pt] small-caps text-center`}>Special</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative  ${bgColorStyle[card.type]} w-[28pt] h-[28pt]`}>
            <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                <div className={`text-[11pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
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
