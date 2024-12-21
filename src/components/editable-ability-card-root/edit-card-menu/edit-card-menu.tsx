import {useState} from "react";
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "../../../types/ability-card-types.ts";
import {TextEditor} from "./text-editor.tsx";
import {UIEditor} from "./ui-editor.tsx";

export function EditCardMenu({card, cardNum, updateCard}: {card: ability_card, cardNum: number, updateCard: (index: number, card: ability_card) => void}) {
    const [useTextEdit, setUseTextEdit] = useState(true);

    return (
        <div className={`flex-none flex flex-col gap-[5pt] h-[504pt] w-[378pt] p-[10pt]`}>
            <div className={`flex justify-center h-[40pt] w-full`}>
                <div role={'button'} onClick={() => {
                    setUseTextEdit(false);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[useTextEdit?`Free Strike Action`:'Maneuver']} items-center`}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[useTextEdit?`Free Strike Action`:'Maneuver']}`}>Menu Editor</div>
                </div>
                <div role={'button'} onClick={() => {
                    setUseTextEdit(true);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[useTextEdit?'Maneuver':`Free Strike Action`]} items-center`}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[useTextEdit?'Maneuver':`Free Strike Action`]}`}>Text Editor</div>
                </div>
            </div>
            {useTextEdit && <TextEditor card={card} cardNum={cardNum} updateCard={updateCard} />}
            {!useTextEdit && <UIEditor card={card} cardNum={cardNum} updateCard={updateCard} />}
        </div>
    );
}