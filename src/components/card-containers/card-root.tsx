import React from "react";
import {Card} from "../../types/card-list.ts";
import {HeroData} from "../../types/character-data.ts";
import WorkspaceCardContainer from "./workspace-card-container.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectVariant} from "../../redux/card-settings-slice.ts";
import ProfessionalPrintCard from "./professional-print-card.tsx";

export default function CardRoot({card, heroData, cardNum, selectedCard, setSelectedCard}: {
    card: Card,
    heroData: HeroData,
    cardNum: number,
    selectedCard: number,
    setSelectedCard: React.Dispatch<React.SetStateAction<number>>,
    deleteCard: (index: number) => void,
    updateCard: (index: number, card: Card) => void
}) {
  const id = Math.random().toString(32);
  const variant = useAppSelector(selectVariant);

  return (
    <div id={id} className={`flex flex-wrap justify-center items-center`} key={cardNum}>
      <div className={`flex flex-col`}>
        {variant === 'useBleedCorners' ?
          <ProfessionalPrintCard id={id} card={card} heroData={heroData} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>:
          <WorkspaceCardContainer id={id} card={card} heroData={heroData} cardNum={cardNum} selectedCard={selectedCard} setSelectedCard={setSelectedCard}/>
        }
      </div>
    </div>
  );
}
