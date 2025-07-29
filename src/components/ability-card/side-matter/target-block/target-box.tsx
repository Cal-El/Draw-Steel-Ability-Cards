import {ability_card, actionTextColorStyle} from "../../../../types/ability-card-types.ts";

export default function TargetBox({card, bgColorStyle, children}: {card: ability_card, bgColorStyle: Record<string, string>, children?: JSX.Element | JSX.Element[]}){
    return (
        <div className={`${bgColorStyle[card.type]} w-[27pt] h-[27pt]`}>
            <div
                className={`overflow-visible h-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Target
            </div>
            {children}
        </div>
    )
}
