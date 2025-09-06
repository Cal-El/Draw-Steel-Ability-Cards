import React from "react";
import AbilityCard from "./ability-card.tsx";
import {asNewCard, asOldCard, Card, getCardTitle, isNewCard} from "../../types/card-list.ts";
import AbilityCardV2 from "../ability-card-v2/ability-card-v2.tsx";
import {HeroData} from "../../types/character-data.ts";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";

export default function WorkspaceCardContainer({id, card, heroData, cardNum, selectedCard, setSelectedCard}: {id: string, card: Card, heroData: HeroData, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
  let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

  return (
    <div id={`${id}_${getCardTitle(card)}_container`} key={`${id}_${getCardTitle(card)}_container`} role="button" onClick={() => {
      if (selectedCardState > 0) {
        setSelectedCard(-1)
      } else {
        setSelectedCard(cardNum)
      }
    }} className={`flex-none flex justify-center items-center break-inside-avoid-page print:h-[180pt] print:w-[252pt] ${selectedCardState > 0 ? '' : 'hover:brightness-90'} print:hover:brightness-100`}>
      {isNewCard(card) ?
        <AbilityCardV2 id={id} card={asNewCard(card)} heroData={heroData} enlargedState={0} />:
        <AbilityCard id={id} card={isNewCard(card) ? DowngradeCard(asNewCard(card), heroData) : asOldCard(card)} enlargedState={0}/>
      }
    </div>
  );
}
