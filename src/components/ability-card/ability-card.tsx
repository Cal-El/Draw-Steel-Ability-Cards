import {
    ability_card, cardbackColorStyle,
} from "../../types/ability-card-types.ts";
import {AbilityCardHeader} from "./header-content/ability-card-header.tsx";
import {AbilityCardBody} from "./body-content/ability-card-body.tsx";
import {AbilityCardSideMatter} from "./side-matter/ability-card-side-matter.tsx";
import React from "react";

function cardContainer(card: ability_card, selectionState: number) {
    return (
        <div className={`cardContainer flex h-[270pt] w-[378pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[card.type]} ${selectionState > 0 ? 'scale-[1.2]' : selectionState < 0 ? 'scale-[0.8]' : 'scale-[1]'}`}>
            <div className={`w-[331.5pt]`}>
                <AbilityCardHeader card={card}/>
                <AbilityCardBody card={card}/>
            </div>
            <AbilityCardSideMatter card={card}/>
        </div>
    );
}

export default function AbilityCard({card, cardNum, selectedCard, setSelectedCard}: {card: ability_card, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

    return (
        <div role="button" onClick={() => {
            if (selectedCardState > 0) {
                setSelectedCard(-1)
            } else {
                setSelectedCard(cardNum)
            }
        }} className={`flex-none flex justify-center items-center ${selectedCardState > 0 ? 'h-[324pt] w-[453.6pt]' : selectedCardState < 0 ? 'h-[216pt] w-[302.4pt]' : 'h-[270pt] w-[378pt]'}`}>
            {cardContainer(card, selectedCardState)}
        </div>
    );
}