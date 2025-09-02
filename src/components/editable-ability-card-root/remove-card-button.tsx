import { getDynamicColorBase } from "../../utils/color-calculator.ts";
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
        }} className={`flex h-[40pt] flex-1 rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
          style={{borderColor: getDynamicColorBase('Triggered Action')}}>
            <div className={`text-[16pt] text-center font-bold select-none`}
                 style={{color:getDynamicColorBase(`Triggered Action`)}}>{btnName[count]}</div>
        </div>
    );
}
