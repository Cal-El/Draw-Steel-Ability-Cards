import {
    ability_card,
} from "../../types/ability-card-types.ts";
import React from "react";
import AbilityCard from "../ability-card/ability-card.tsx";
import {EditCardMenu} from "./edit-card-menu/edit-card-menu.tsx";
import {RemoveCardButton} from "./remove-card-button.tsx";
import {DownloadCardButton} from "./download-card-button.tsx";

export default function EditableAbilityCardRoot({card, cardNum, selectedCard, setSelectedCard, deleteCard, updateCard}: {
    card: ability_card,
    cardNum: number,
    selectedCard: number,
    setSelectedCard: React.Dispatch<React.SetStateAction<number>>,
    deleteCard: (index: number) => void,
    updateCard: (index: number, card: ability_card) => void
}) {
    const id = Math.random().toString(32);

    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1);

    return (
        <div id={id} className={`flex flex-wrap justify-center items-center ${selectedCardState > 0 ? 'w-screen' : ''}`} key={cardNum}>
            <div className={`flex flex-col`}>
                <AbilityCard id={id} card={card} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
                {selectedCardState > 0 &&
                    <div className={`flex`}>
                        <DownloadCardButton card={card} id={id}/>
                        <RemoveCardButton cardNum={cardNum} deleteCard={deleteCard}/>
                    </div>
                }
            </div>
            {selectedCardState > 0 &&
                <EditCardMenu card={card} cardNum={cardNum} updateCard={updateCard} />
            }
        </div>
    );
}