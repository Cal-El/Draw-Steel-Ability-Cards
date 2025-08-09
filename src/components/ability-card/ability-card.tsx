import {
    ability_card, cardbackColorStyle,
} from "../../types/ability-card-types.ts";
import {AbilityCardHeader} from "./header-content/ability-card-header.tsx";
import {AbilityCardBody} from "./body-content/ability-card-body.tsx";
import {AbilityCardSideMatter} from "./side-matter/ability-card-side-matter.tsx";

function cardContainer(card: ability_card, enlargedState: number) {
    return (
        <div className={`cardContainer flex h-[180pt] w-[252pt] rounded-[9pt] border-[1.5pt] print:scale-[1] ${cardbackColorStyle[card.type]} ${enlargedState > 0 ? 'scale-[2]' : enlargedState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}>
            <div className={`w-[222pt]`}>
                <AbilityCardHeader card={card}/>
                <AbilityCardBody card={card}/>
            </div>
            <AbilityCardSideMatter card={card}/>
        </div>
    );
}

export default function AbilityCard({id, card, enlargedState}: {id: string, card: ability_card, enlargedState: number}) {
    return (
        <div id={`${id}_${card.title}_card`} key={`${id}_${card.title}_card`} className={`flex-none flex justify-center items-center print:h-[180pt] print:w-[252pt] ${enlargedState > 0 ? 'h-[360pt] w-[504pt]' : enlargedState < 0 ? 'h-[180pt] w-[252pt]' : 'h-[270pt] w-[378pt]'}`}>
            {cardContainer(card, enlargedState)}
        </div>
    );
}
