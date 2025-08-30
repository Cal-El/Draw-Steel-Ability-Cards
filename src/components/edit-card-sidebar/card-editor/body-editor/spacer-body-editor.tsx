import {ability_card, spacer} from "../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";
import BodyEditorTopbar from "./body-editor-topbar.tsx";

export default function SpacerBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={'Spacer'}/>
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <div className={`flex justify-end items-center w-full`}>
        <div className={`font-bold text-right flex-grow`}>Size (pt):</div>
      </div>
      <input value={(card.body[bodyIdx] as spacer).sizePt} onChange={(e) => {
        const l = parseInt(e.target.value);
        const ll = l ? l : (l === 0 ? 0 : undefined);
        const temp = [...card.body]
        temp[bodyIdx] = {...temp[bodyIdx] as spacer, sizePt: ll ?? 0};
        setCard({...card, body: temp})
      }} type={"number"} min={1} max={10} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
    </div>
  </>
}
