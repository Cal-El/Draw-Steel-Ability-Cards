import React from "react";
import {asNewCard, asOldCard, Card, isNewCard} from "../../types/card-list.ts";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {HeroData} from "../../types/character-data.ts";
import WorkspaceCardContainer from "../ability-card/workspace-card-container.tsx";

export default function EditableAbilityCardRoot({card, heroData, cardNum, selectedCard, setSelectedCard}: {
    card: Card,
    heroData: HeroData,
    cardNum: number,
    selectedCard: number,
    setSelectedCard: React.Dispatch<React.SetStateAction<number>>,
    deleteCard: (index: number) => void,
    updateCard: (index: number, card: Card) => void
}) {
    const id = Math.random().toString(32);
    return (
        <div id={id} className={`flex flex-wrap justify-center items-center`} key={cardNum}>
            <div className={`flex flex-col`}>
                <WorkspaceCardContainer id={id} card={isNewCard(card) ? DowngradeCard(asNewCard(card), heroData) : asOldCard(card)} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
            </div>
        </div>
    );
}
