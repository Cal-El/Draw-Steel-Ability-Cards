import {ability_card, getDynamicColorBase} from "../../../types/ability-card-types.ts";

export function CostBlock({card}: {card: ability_card}) {
    if (!card.hasCost) {
        return (<div className={`w-[54pt] h-[15pt]`}></div>);
    }
    return (
        <div className={`w-[54pt] h-[15pt] flex flex-col justify-center rounded-tr-[5pt] rounded-bl-[4pt]`}
             style={{backgroundColor:getDynamicColorBase(card.type)}}>
            <div className={`text-[8pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{card.cost?.costValue} {card.cost?.costName}</div>
        </div>
    );
}
