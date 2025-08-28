import {ability_card} from "../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../types/card-list.ts";

export default function HrCostEditor({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return (
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <div className={`flex justify-end items-center w-full py-1.5`}>
        <div className={`font-bold text-right`}>HR Cost:</div>
      </div>
      <div className={`col-span-3 flex justify-start items-center w-full gap-2`}>
        <input type={`checkbox`} checked={!!card.cost} onChange={(e) => {
          if (e.target.checked) {
            setCard({...card, cost: {costName: '', costValue: ''}})
          } else {
            setCard({...card, cost: undefined})
          }
        }} className={`border-2 border-stone-400 p-1 flex-none`}/>
        {card.cost && <>
          <div className={`flex justify-end items-center flex-shrink`}>
            <div className={`font-bold text-right border-l-2 border-stone-400 pl-2`}>Value:</div>
          </div>
          <input value={card.cost.costValue} onChange={(e) => {
            setCard({...card, cost: {costName: card.cost?.costName || '', costValue: e.target.value}})
          }} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
          <div className={`flex justify-end items-center`}>
            <div className={`font-bold text-right`}>Name:</div>
          </div>
          <input value={card.cost.costName} onChange={(e) => {
            setCard({...card, cost: {costName: e.target.value, costValue: card.cost?.costValue || ''}})
          }} className={`border-2 border-stone-400 p-1 flex-grow`}></input>
        </>}
      </div>
    </div>
  );
}
