import {
    ability_card, actionBg100ColorStyle,
    actionBg40ColorStyle, typeAbbreviation,
} from "../../../types/ability-card-types.ts";
import {CostBlock} from "./cost-block.tsx";
import {DistanceBlockList} from "./distance-block.tsx";
import {TargetBlock} from "./target-block.tsx";

export function AbilityCardSideMatter({card}: {card: ability_card}) {
    return (
      <div className={`relative w-[27pt] overflow-visible flex flex-col items-end`}>
        <CostBlock card={card}/>
        <div className={`flex flex-col items-right`}>
            <TargetBlock card={card} bgColorStyle={actionBg40ColorStyle}/>
            <DistanceBlockList card={card}/>
        </div>
        <div className={`w-[27pt] h-[15pt] ${actionBg100ColorStyle[card.type]} absolute right-0 bottom-0 flex flex-col justify-center rounded-tl-[5pt] rounded-br-[4pt]`}>
            <div className={`text-[8pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{typeAbbreviation[card.type]}</div>
        </div>
      </div>
    );
}
