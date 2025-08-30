import {ability_card, all_characteristics, characteristic, power_roll} from "../../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../../types/card-list.ts";
import BodyEditorTopbar from "../body-editor-topbar.tsx";
import {EditCharacteristicInput} from "../../common-editor-elements.tsx";
import PowerRollTierBodyEditor from "./power-roll-tier-body-editor.tsx";

export default function PowerRollBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={'Power Roll'}/>
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <EditCharacteristicInput fieldName={'Power Roll Bonus'} fieldValues={((card.body[bodyIdx] as power_roll).characteristicBonus as characteristic[])} onChange={(e) => {
        const tempBody = [...card.body];
        (tempBody[bodyIdx] as power_roll).characteristicBonus = e.sort((a, b) => all_characteristics.indexOf(a) - all_characteristics.indexOf(b));
        setCard({...card, body: tempBody})
      }}/>
    </div>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t1} tierNum={1}/>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t2} tierNum={2}/>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t3} tierNum={3}/>
  </>
}
