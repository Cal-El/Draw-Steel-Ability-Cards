import { selectCardTypeSettingsByCardType } from "../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../redux/hooks.ts";
import {
  ability_card,
  typeAbbreviation,
} from "../../../types/ability-card-types.ts";
import { getDynamicColor40, getDynamicColorBase } from "../../../utils/color-calculator.ts";
import {CostBlock} from "./cost-block.tsx";
import {DistanceBlockList} from "./distance-block.tsx";
import {TargetBlock} from "./target-block.tsx";

export function AbilityCardSideMatter({card}: {card: ability_card}) {
    const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}
    return (
      <div className={`relative w-[27pt] overflow-visible flex flex-col items-end`}>
        <CostBlock card={card}/>
        <div className={`flex flex-col items-right`}>
            <TargetBlock card={card} bgColorGetter={getDynamicColor40}/>
            <DistanceBlockList card={card}/>
        </div>
        <div className={`w-[27pt] h-[15pt] absolute right-0 bottom-0 flex flex-col justify-center rounded-tl-[5pt] rounded-br-[4pt]`}
             style={{backgroundColor:getDynamicColorBase(card.type, cardTypeSettings)}}>
            <div className={`text-[8pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{typeAbbreviation[card.type]}</div>
        </div>
      </div>
    );
}
