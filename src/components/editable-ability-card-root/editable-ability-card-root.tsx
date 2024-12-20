import {
    ability_card,
} from "../../types/ability-card-types.ts";
import React, {useState} from "react";
import AbilityCard from "../ability-card/ability-card.tsx";
import {EditCardMenu} from "./edit-card-menu/edit-card-menu.tsx";
import {RemoveCardButton} from "./remove-card-button.tsx";

export default function EditableAbilityCardRoot({card, cardNum, selectedCard, setSelectedCard}: {card: ability_card, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
    const [cardState, setCardState] = useState(card);

    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

    return (
        <div className={`flex flex-wrap justify-center items-center ${selectedCardState > 0 ? 'w-screen' : ''}`} key={cardNum}>
            <div className={`flex flex-col`}>
                <AbilityCard card={cardState} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
                {selectedCardState > 0 &&
                    <RemoveCardButton/>
                }
            </div>
            {selectedCardState > 0 &&
                <EditCardMenu card={cardState} setCardState={setCardState} />
            }
        </div>
    );
}