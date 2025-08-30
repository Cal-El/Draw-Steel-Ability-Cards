import {SectionSeparator} from "../common-editor-elements.tsx";
import {ability_card, effect, power_roll, spacer} from "../../../../types/ability-card.ts";
import EffectBodyEditor from "./effect-body-editor.tsx";
import SpacerBodyEditor from "./spacer-body-editor.tsx";
import PowerRollBodyEditor from "./power-roll-body-editor/power-roll-body-editor.tsx";
import AddToBodyButtons from "./add-to-body-buttons.tsx";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";

export default function BodyEditor({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return (<>
    <SectionSeparator name={'Body'}/>
    {card.body.map((v, i) => {
      if ((v as effect).isEffect) {
        return <EffectBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
      }
      if ((v as spacer).isSpacer) {
        return <SpacerBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
      }
      if ((v as power_roll).isPowerRoll) {
        return <PowerRollBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
      }
    })}
    <AddToBodyButtons card={card} setCard={setCard}/>
  </>);
}
