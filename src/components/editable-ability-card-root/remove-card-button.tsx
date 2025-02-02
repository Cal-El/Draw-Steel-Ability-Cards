import {actionTextColorStyle, cardbackColorStyle} from "../../types/ability-card-types.ts";
import {useState} from "react";

export function RemoveCardButton({cardNum, deleteCard}: {cardNum: number, deleteCard: (index: number) => void}) {
    const [count, setCount] = useState(0);
    const btnName = [
        'Remove Card',
        'Are you sure?',
    ]

    return (
        <div role='button' onClick={() => {
            if (count + 1 >= btnName.length) {
                deleteCard(cardNum);
            } else {
                setCount(count + 1)
            }
        }} className={`flex h-[40pt] flex-1 rounded-[13.5pt] border border-[3pt] ${cardbackColorStyle[`Triggered Action`]} justify-center items-center`}>
            <div className={`text-[16pt] text-center ${actionTextColorStyle[`Triggered Action`]} font-bold select-none`}>{btnName[count]}</div>
        </div>
    );
}