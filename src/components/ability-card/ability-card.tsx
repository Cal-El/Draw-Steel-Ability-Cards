import {
    ability_card, cardbackColorStyle,
} from "../../types/ability-card-types.ts";
import {AbilityCardHeader} from "./header-content/ability-card-header.tsx";
import {AbilityCardBody} from "./body-content/ability-card-body.tsx";
import {AbilityCardSideMatter} from "./side-matter/ability-card-side-matter.tsx";
import React from "react";

function cardContainer(card: ability_card, selectionState: number) {
    return (
        <div className={`cardContainer flex h-[180pt] w-[252pt] rounded-[9pt] border-[2pt] print:scale-[1] ${cardbackColorStyle[card.type]} ${selectionState > 0 ? 'scale-[2]' : selectionState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}>
            <div className={`w-[221pt]`}>
                <AbilityCardHeader card={card}/>
                <AbilityCardBody card={card}/>
            </div>
            <AbilityCardSideMatter card={card}/>
        </div>
    );
}

export default function AbilityCard({id, card, cardNum, selectedCard, setSelectedCard}: {id: string, card: ability_card, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

    return (
        <div id={`${id}_${card.title}_card`} role="button" onClick={() => {
            if (selectedCardState > 0) {
                setSelectedCard(-1)
            } else {
                setSelectedCard(cardNum)
            }
        }} className={`flex-none flex justify-center items-center break-inside-avoid-page print:h-[180pt] print:w-[252pt] ${selectedCardState > 0 ? 'h-[360pt] w-[504pt]' : selectedCardState < 0 ? 'h-[180pt] w-[252pt] hover:brightness-90' : 'h-[270pt] w-[378pt] hover:brightness-90'}`}>
            {cardContainer(card, selectedCardState)}
        </div>
    );
}
