import { selectColourSettings } from "../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../redux/hooks.ts";
import {ability_card} from "../../../types/ability-card-types.ts";
import { getDynamicColorBase } from "./../utils/color-calculator.ts";

export function CostBlock({card}: {card: ability_card}) {
    const colourSettings = useAppSelector(selectColourSettings)
    if (!card.hasCost) {
        return (<div className={`w-[54pt] h-[15pt]`}></div>);
    }
    return (
        <div className={`w-[54pt] h-[15pt] flex flex-col justify-center rounded-tr-[5pt] rounded-bl-[4pt]`}
             style={{backgroundColor:getDynamicColorBase(card.type, colourSettings)}}>
            <div className={`text-[8pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{card.cost?.costValue} {card.cost?.costName}</div>
        </div>
    );
}
