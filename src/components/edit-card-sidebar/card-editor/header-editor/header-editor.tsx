import {EditKeywordsInput, EditTextAreaInput, EditTextInput, SectionSeparator} from "../common-editor-elements.tsx";
import DistanceEditor from "./distance-editor.tsx";
import {ability_card} from "../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";

export default function HeaderEditor({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return(<>
    <SectionSeparator name={'Header'}/>
    <EditTextInput fieldName={'Top Text'} fieldValue={card.header.topMatter} onChange={(e) => {
      setCard({...card, header: {...card.header, topMatter: e.target.value}})
    }}/>
    <EditTextInput fieldName={'Card Name'} fieldValue={card.header.title} onChange={(e) => {
      setCard({...card, header: {...card.header, title: e.target.value}})
    }}/>
    <EditTextAreaInput fieldName={'Flavour Text'} fieldValue={card.header.flavour} onChange={(e) => setCard({
      ...card,
      header: {...card.header, flavour: (e.target as HTMLTextAreaElement).value},
    })}/>
    <EditKeywordsInput fieldName={'Keywords'} fieldValues={card.header.keywords} onChange={(ks) => setCard({
      ...card,
      header: {...card.header, keywords: ks},
    })}/>
    <EditTextInput fieldName={'Target'} fieldValue={card.header.target} onChange={(e) => {
      setCard({...card, header: {...card.header, target: e.target.value}})
    }}/>
    <DistanceEditor card={card} onChange={setCard}/>
  </>);
}
