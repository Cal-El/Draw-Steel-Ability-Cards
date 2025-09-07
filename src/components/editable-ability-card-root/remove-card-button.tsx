import {useState} from "react";
import {getPrimaryColor} from "../ability-card/utils/color-calculator.ts";

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
        }} className={`flex h-[40pt] flex-1 rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
          style={{borderColor: getPrimaryColor('Triggered Action', {cardTypeColours: {}})}}>
            <div className={`text-[16pt] text-center font-bold select-none`}
                 style={{color:getPrimaryColor(`Triggered Action`, {cardTypeColours: {}})}}>{btnName[count]}</div>
        </div>
    );
}
