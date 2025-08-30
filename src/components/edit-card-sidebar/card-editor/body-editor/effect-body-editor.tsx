import {ability_card, effect} from "../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";
import BodyEditorTopbar from "./body-editor-topbar.tsx";
import {EditTextAreaInput, EditTextInput} from "../common-editor-elements.tsx";

export default function EffectBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={(card.body[bodyIdx] as effect).title}/>
    <EditTextInput fieldName={'Title'} fieldValue={(card.body[bodyIdx] as effect).title} onChange={(e) => {
      const temp = [...card.body]
      temp[bodyIdx] = {...temp[bodyIdx] as effect, title: e.target.value};
      setCard({...card, body: temp})
    }}/>
    <EditTextAreaInput fieldName={'Body'} fieldValue={(card.body[bodyIdx] as effect).body} onChange={(e) => {
      const temp = [...card.body]
      temp[bodyIdx] = {...temp[bodyIdx] as effect, body: (e.target as HTMLTextAreaElement).value};
      setCard({...card, body: temp})
    }}/>
  </>
}
