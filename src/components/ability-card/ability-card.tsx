import {
    ability_card,
} from "../../types/ability-card-types.ts";
import { getBackgroundColor, getDynamicColorBase } from "../../utils/color-calculator.ts";
import {AbilityCardHeader} from "./header-content/ability-card-header.tsx";
import {AbilityCardBody} from "./body-content/ability-card-body.tsx";
import {AbilityCardSideMatter} from "./side-matter/ability-card-side-matter.tsx";
import { useSelector } from "react-redux";
import { selectBaseColours, selectCardTypeSettingsByCardType } from "../../redux/card-settings-slice.ts";
import { ColourSet } from "../../types/card-settings.ts";

function cardContainer(card: ability_card, enlargedState: number, cardColourSettings: ColourSet, baseColours: ColourSet) {
    return (
        <div className={`cardContainer flex h-[180pt] w-[252pt] rounded-[9pt] border-[1.5pt] print:scale-[1] ${enlargedState > 0 ? 'scale-[2]' : enlargedState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}
          style={{borderColor: getDynamicColorBase(card.type, cardColourSettings, baseColours), backgroundColor: getBackgroundColor(baseColours)}}>
            <div className={`w-[222pt]`}>
                <AbilityCardHeader card={card}/>
                <AbilityCardBody card={card}/>
            </div>
            <AbilityCardSideMatter card={card}/>
        </div>
    );
}

export default function AbilityCard({id, card, enlargedState}: {id: string, card: ability_card, enlargedState: number}) {
    const baseColourSettings = useSelector(selectBaseColours)
    const cardTypeSettings = useSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}
    return (
        <div id={`${id}_${card.title}_card`} key={`${id}_${card.title}_card`} className={`flex-none flex justify-center items-center print:h-[180pt] print:w-[252pt] ${enlargedState > 0 ? 'h-[360pt] w-[504pt]' : enlargedState < 0 ? 'h-[180pt] w-[252pt]' : 'h-[270pt] w-[378pt]'}`}>
            {cardContainer(card, enlargedState, cardTypeSettings, baseColourSettings ?? {})}
        </div>
    );
}
