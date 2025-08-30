import {ability_card} from "../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";

export default function AddToBodyButtons({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return <div className={`col-span-full divide-x divide-black w-full min-h-[24pt] overflow-hidden bg-stone-400 border-2 border-stone-600 rounded-lg flex`}>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {}}>
      <div>Add Power Roll</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isEffect: true, title: 'Trigger', body: 'When...'}]})
    }}>
      <div>Add Trigger</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isEffect: true, title: 'Effect', body: 'Some effect'}]})
    }}>
      <div>Add Effect</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isSpacer: true, sizePt: 5}]})
    }}>
      <div>Add Spacer</div>
    </div>
  </div>
}
