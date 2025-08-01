import React from "react";
import AbilityCard from "../ability-card/ability-card.tsx";
import {EditCardMenu} from "./edit-card-menu/edit-card-menu.tsx";
import {RemoveCardButton} from "./remove-card-button.tsx";
import {DownloadCardButton} from "./download-card-button.tsx";
import {asNewCard, asOldCard, Card, isNewCard} from "../../types/card-list.ts";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {HeroData} from "../../types/character-data.ts";

export default function EditableAbilityCardRoot({card, heroData, cardNum, selectedCard, setSelectedCard, deleteCard, updateCard}: {
    card: Card,
    heroData: HeroData,
    cardNum: number,
    selectedCard: number,
    setSelectedCard: React.Dispatch<React.SetStateAction<number>>,
    deleteCard: (index: number) => void,
    updateCard: (index: number, card: Card) => void
}) {
    const id = Math.random().toString(32);

    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1);

    return (
        <div id={id} className={`flex flex-wrap justify-center items-center ${selectedCardState > 0 ? 'w-full' : ''}`} key={cardNum}>
            <div className={`flex flex-col`}>
                <AbilityCard id={id} card={isNewCard(card) ? DowngradeCard(asNewCard(card), heroData) : asOldCard(card)} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
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
