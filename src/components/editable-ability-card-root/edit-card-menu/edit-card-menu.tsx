import React, {useState} from "react";
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "../../../types/ability-card-types.ts";
import {TextEditor} from "./text-editor.tsx";
import {UIEditor} from "./ui-editor.tsx";

export function EditCardMenu({card, setCardState}: {card: ability_card, setCardState: React.Dispatch<React.SetStateAction<ability_card>>}) {
    const [useTextEdit, setUseTextEdit] = useState(false);

    return (
        <div className={`flex-none h-[504pt] w-[378pt]`}>
            <div className={`flex justify-center h-[40pt] w-full`}>
                <div role={'button'} onClick={() => {
                    setUseTextEdit(false);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[useTextEdit?`Free Strike Action`:'Maneuver']} items-center`}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[useTextEdit?`Free Strike Action`:'Maneuver']}`}>Edit Menu</div>
                </div>
                <div role={'button'} onClick={() => {
                    setUseTextEdit(true);
                }} className={`basis-1/2 flex h-full rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[useTextEdit?'Maneuver':`Free Strike Action`]} items-center`}>
                    <div className={`w-full text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[useTextEdit?'Maneuver':`Free Strike Action`]}`}>Text Editor</div>
                </div>
            </div>
            {useTextEdit && <TextEditor card={card} setCardState={setCardState}/>}
            {!useTextEdit && <UIEditor card={card} setCardState={setCardState}/>}
        </div>
    );
}