import {ability_card, getDynamicColorBase} from "../../../../types/ability-card-types.ts";

export default function TargetBox({card, bgColorGetter, children}: {card: ability_card, bgColorGetter: (t: string) => string, children?: JSX.Element | JSX.Element[]}){
    return (
        <div className={`w-[27pt] h-[27pt]`}
             style={{backgroundColor: bgColorGetter(card.type)}}>
            <div
                className={`overflow-visible h-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                style={{color:getDynamicColorBase(card.type)}}>Target
            </div>
            {children}
        </div>
    )
}
