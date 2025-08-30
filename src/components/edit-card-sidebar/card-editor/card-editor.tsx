import {asNewCard, Card} from "../../../types/card-list.ts";
import {Dispatch, useState} from "react";
import {TextEditor} from "../../editable-ability-card-root/edit-card-menu/text-editor.tsx";
import {
  ability_card,
} from "../../../types/ability-card.ts";
import BodyEditor from "./body-editor/body-editor.tsx";
import HeaderEditor from "./header-editor/header-editor.tsx";
import HrCostEditor from "./hr-cost-editor.tsx";
import LevelAndTypeEditor from "./level-and-type-editor.tsx";
import FontsizeEditor from "./fontsize-editor.tsx";

function EditorTypeSwitch({useTextEditor, setUseTextEditor} : {useTextEditor : boolean, setUseTextEditor : Dispatch<boolean>}) {
  return (
    <div className={`w-full min-h-[24pt] overflow-hidden bg-stone-400 border-2 border-stone-600 rounded-lg flex`}>
      <div role={`button`} className={`basis-1/2 ${useTextEditor ? `bg-zinc-50` : 'bg-zinc-200'} flex justify-center items-center`} onClick={() => setUseTextEditor(false)}>
        <div>Editor UI</div>
      </div>
      <div role={`button`} className={`basis-1/2 ${!useTextEditor ? `bg-zinc-50` : 'bg-zinc-200'} flex justify-center items-center`} onClick={() => setUseTextEditor(true)}>
        <div>YAML Editor</div>
      </div>
    </div>
  );
}

function EditorUI({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return (<>
    <div className={`grid auto-cols-min auto-rows-min grid-cols-4 w-full gap-2`}>
      <LevelAndTypeEditor card={card} setCard={setCard}/>
      <HrCostEditor card={card} setCard={setCard}/>
      <HeaderEditor card={card} setCard={setCard}/>
      <BodyEditor card={card} setCard={setCard}/>
      <FontsizeEditor card={card} setCard={setCard}/>
    </div>
  </>);
}

export default function CardEditor({card, setCard} : {card: Card, setCard: Dispatch<Card>}) {
  const [useTextEditor, setUseTextEditor] = useState(false);

  return (
    <div className={`h-full w-full max-w-[511.5pt] overflow-y-scroll scrollbar border-t border-t-gray-300 flex flex-col gap-[10pt]`}>
      <EditorTypeSwitch useTextEditor={useTextEditor} setUseTextEditor={setUseTextEditor}/>
      {useTextEditor ?
        <TextEditor card={card} cardNum={1} updateCard={(_, c) => setCard(c)}/> :
        <EditorUI card={asNewCard(card)} setCard={setCard}/>
      }
    </div>
  );
}
