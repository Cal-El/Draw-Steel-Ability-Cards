import {useState} from "react";
import { getDynamicColorBase } from "../../../utils/color-calculator.ts";
import {TextEditor} from "./text-editor.tsx";
import {UIEditor} from "./ui-editor.tsx";
import { Tooltip } from "react-tooltip";
import {asOldCard, Card, isNewCard} from "../../../types/card-list.ts";

export function EditCardMenu({card, cardNum, updateCard}: {card: Card, cardNum: number, updateCard: (index: number, card: Card) => void}) {
    const [useTextEdit, setUseTextEdit] = useState(isNewCard(card));

    return (
        <div className={`flex-none flex flex-col gap-[5pt] w-full p-[10pt]`}>
            <div className={`flex justify-center h-[40pt] w-full`}>
              {!isNewCard(card) && <div role={'button'} onClick={() => {
                    setUseTextEdit(false);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] bg-cardback items-center`}
                    style={{borderColor: getDynamicColorBase(useTextEdit ? 'Free Strike Action': 'Maneuver')}}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none`}
                         style={{color:getDynamicColorBase(useTextEdit?`Free Strike Action`:'Maneuver')}}>Menu Editor</div>
                </div>
              }
                <div role={'button'} onClick={() => {
                    setUseTextEdit(true);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] bg-cardback items-center`}
                  style={{borderColor: getDynamicColorBase(useTextEdit ? 'Maneuver': 'Free Strike Action')}}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none`}
                      style={{color:getDynamicColorBase(useTextEdit?'Maneuver':`Free Strike Action`)}}>Text Editor</div>
                </div>
                <a href="https://commonmark.org/help/" target="_blank" 
                    className={`basis-1/6 flex h-full rounded-[13.5pt] border-[3pt] bg-cardback border-routine-card items-center`}
                    data-tooltip-id="markdown-tt" data-tooltip-content="Markdown supported on key-value blocks">
                    <div className={`w-full text-[10pt] px-2 text-center font-bold font-body small-caps leading-none text-routine-card`}>MD Guide</div>
                </a>
                <Tooltip id="markdown-tt"></Tooltip>
            </div>
            {useTextEdit && <TextEditor card={card} cardNum={cardNum} updateCard={updateCard} />}
            {!useTextEdit && <UIEditor card={asOldCard(card)} cardNum={cardNum} updateCard={updateCard} />}
        </div>
    );
}
