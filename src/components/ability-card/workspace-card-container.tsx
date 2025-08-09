import {ability_card} from "../../types/ability-card-types.ts";
import React from "react";
import AbilityCard from "./ability-card.tsx";

export default function WorkspaceCardContainer({id, card, cardNum, selectedCard, setSelectedCard}: {id: string, card: ability_card, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
  let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

  return (
    <div id={`${id}_${card.title}_container`} key={`${id}_${card.title}_container`} role="button" onClick={() => {
      if (selectedCardState > 0) {
        setSelectedCard(-1)
      } else {
        setSelectedCard(cardNum)
      }
    }} className={`flex-none flex justify-center items-center break-inside-avoid-page print:h-[180pt] print:w-[252pt] ${selectedCardState > 0 ? '' : 'hover:brightness-90'}`}>
      <AbilityCard id={id} card={card} enlargedState={0}/>
    </div>
  );
}
