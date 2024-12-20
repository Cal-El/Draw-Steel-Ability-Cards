import {
    ability_card,
    actionBg40ColorStyle,
} from "../../../types/ability-card-types.ts";
import {CostBlock} from "./cost-block.tsx";
import {DistanceBlockList} from "./distance-block.tsx";
import {TargetBlock} from "./target-block.tsx";

export function AbilityCardSideMatter({card}: {card: ability_card}) {
    return (<div className={`relative w-[42pt]`}>
        <CostBlock card={card}/>
        <div className={`flex flex-col items-right absolute right-0 top-[24pt]`}>
            <TargetBlock card={card} bgColorStyle={actionBg40ColorStyle}/>
            <DistanceBlockList card={card}/>
        </div>
    </div>);
}