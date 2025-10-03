import React from "react";
import AbilityCard from "../ability-card/ability-card.tsx";
import {asNewCard, asOldCard, Card, getCardTitle, isNewCard} from "../../types/card-list.ts";
import {HeroData} from "../../types/character-data.ts";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {ThemeBasedCard} from "../theme-based-card.tsx";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectThemeColours, selectVariant} from "../../redux/card-settings-slice.ts";
import {getPrimaryColor} from "../ability-card-v2/utils/color-calculator.ts";

export default function ProfessionalPrintCard({id, card, heroData, cardNum, selectedCard, setSelectedCard}: {id: string, card: Card, heroData: HeroData, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
  const colourSettings = useAppSelector(selectThemeColours);
  const variant = useAppSelector(selectVariant);

  const selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

  return (
    <div id={`${id}_${getCardTitle(card)}_professional_print`} key={`${id}_${getCardTitle(card)}_professional_print`} role="button"
         onClick={() => {
           if (selectedCardState > 0) {
             setSelectedCard(-1)
           } else {
             setSelectedCard(cardNum)
           }
         }}
         style={{
           display: "grid",
           gridTemplateColumns: "0.125in 0.125in 3.5in 0.125in 0.125in",
           gridTemplateRows: "0.125in 0.125in 2.5in 0.125in 0.125in",
           justifyItems: "center",
           alignItems: "center",
           width: "4in",
           height: "3in",
           border: "solid",
           borderColor: "lightgray",
           borderWidth: "0.5pt",
           backgroundColor: "white",
         }}
         className={`professional_print flex-none break-inside-avoid-page ${selectedCardState > 0 ? '' : 'hover:brightness-90'} print:hover:brightness-100 not:print:hidden`}>
      <div className="h-full w-full col-start-2 row-start-1 border-r-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-3 row-start-1 border-x-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-4 row-start-1 border-l-[0.5pt] border-black"/>

      <div className="h-full w-full col-start-2 row-start-5 border-r-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-3 row-start-5 border-x-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-4 row-start-5 border-l-[0.5pt] border-black"/>

      <div className="h-full w-full col-start-1 row-start-2 border-b-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-1 row-start-3 border-y-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-1 row-start-4 border-t-[0.5pt] border-black"/>

      <div className="h-full w-full col-start-5 row-start-2 border-b-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-5 row-start-3 border-y-[0.5pt] border-black"/>
      <div className="h-full w-full col-start-5 row-start-4 border-t-[0.5pt] border-black"/>

      <div id={`${id}_${getCardTitle(card)}_card_and_margins`}
           style={{backgroundColor: variant === 'useBleedCorners' ? getPrimaryColor(card.type, colourSettings, 100) : 'transparent'}}
           className={`printable_card col-start-2 row-start-2 col-span-3 row-span-3 grid grid-cols-subgrid grid-rows-subgrid justify-center items-center`}>
        <div className={`col-start-2 row-start-2`}>
        {isNewCard(card) ?
          <ThemeBasedCard id={id} c={asNewCard(card)} hd={heroData} enlargedState={-1} /> :
          <AbilityCard id={id} card={isNewCard(card) ? DowngradeCard(asNewCard(card), heroData) : asOldCard(card)} enlargedState={-1} />
        }
        </div>
      </div>
    </div>
  );
}
