import {ability_card, abilityTypeValues} from "../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../types/card-list.ts";

export default function LevelAndTypeEditor({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return(
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <div className={`flex justify-end items-center w-full`}>
        <div className={`font-bold text-right`}>Level:</div>
      </div>
      <div className={`col-span-3 flex gap-2`}>
        <input value={card.level} onChange={(e) => {
          const l = parseInt(e.target.value);
          const ll = l ? l : (l === 0 ? 0 : undefined);
          setCard({...card, level: ll ?? 1})
        }} type={"number"} min={1} max={10} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
        <div className={`w-[40pt] flex-none`}/>
        <div className={`flex justify-end items-center flex-shrink`}>
          <div className={`font-bold text-right`}>Type:</div>
        </div>
        <select
          value={card.type}
          onInput={(e) => {
            setCard({...card, type: (e.target as HTMLSelectElement).value})
          }}
          className={`border-2 border-stone-400 p-1 flex-grow`}>
          {abilityTypeValues.map(t => (<option>{t}</option>))}
        </select>
      </div>
    </div>
  );
}
