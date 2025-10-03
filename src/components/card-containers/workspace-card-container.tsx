import React from "react";
import AbilityCard from "../ability-card/ability-card.tsx";
import {asNewCard, asOldCard, Card, getCardTitle, isNewCard} from "../../types/card-list.ts";
import {HeroData} from "../../types/character-data.ts";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {ThemeBasedCard} from "../theme-based-card.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectThemeColours, selectVariant} from "../../redux/card-settings-slice.ts";
import {getPrimaryColor} from "../ability-card-v2/utils/color-calculator.ts";

export default function WorkspaceCardContainer({id, card, heroData, cardNum, selectedCard, setSelectedCard}: {id: string, card: Card, heroData: HeroData, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
  const colourSettings = useAppSelector(selectThemeColours);
  const variant = useAppSelector(selectVariant);

  const selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

  return (
    <div id={`${id}_${getCardTitle(card)}_container`} key={`${id}_${getCardTitle(card)}_container`} role="button"
         onClick={() => {
           if (selectedCardState > 0) {
             setSelectedCard(-1)
           } else {
             setSelectedCard(cardNum)
           }
         }}
         className={`card_container flex-none break-inside-avoid-page ${selectedCardState > 0 ? '' : 'hover:brightness-90'} print:hover:brightness-100`}>
      <div id={`${id}_${getCardTitle(card)}_printable_card`}
           style={{backgroundColor: variant === 'useBleedCorners' ? getPrimaryColor(card.type, colourSettings, 100) : 'transparent'}}
           className={`printable_card flex justify-center items-center`}>
      {isNewCard(card) ?
        <ThemeBasedCard id={id} c={asNewCard(card)} hd={heroData} enlargedState={0} /> :
        <AbilityCard id={id} card={isNewCard(card) ? DowngradeCard(asNewCard(card), heroData) : asOldCard(card)} enlargedState={0} />
      }
      </div>
    </div>
  );
}
