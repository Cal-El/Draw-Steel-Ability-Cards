import {ability_card, actionBg100ColorStyle} from "../../../types/ability-card-types.ts";

export function CostBlock({card}: {card: ability_card}) {
    if (!card.hasCost) {
        return (<></>);
    }
    return (
        <div className={`w-[81pt] h-[24pt] ${actionBg100ColorStyle[card.type]} absolute right-0 top-0 flex flex-col justify-center rounded-tr-[7.5pt] rounded-bl-[6pt]`}>
            <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{card.cost?.costValue} {card.cost?.costName}</div>
        </div>
    );
}