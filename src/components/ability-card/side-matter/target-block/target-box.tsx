import {ability_card, actionTextColorStyle} from "../../../../types/ability-card-types.ts";

export default function TargetBox({card, bgColorStyle, children}: {card: ability_card, bgColorStyle: Record<string, string>, children?: JSX.Element | JSX.Element[]}){
    return (
        <div className={`relative  ${bgColorStyle[card.type]} w-[42pt] h-[42pt]`}>
            <div
                className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
            </div>
            {children}
        </div>
    )
}