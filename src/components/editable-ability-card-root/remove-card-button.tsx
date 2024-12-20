import {actionTextColorStyle, cardbackColorStyle} from "../../types/ability-card-types.ts";

export function RemoveCardButton() {
    return (
        <div role='button' onClick={() => {
            // remove card
        }} className={`flex h-[40pt] w-[453.6pt] rounded-[13.5pt] border border-[3pt] ${cardbackColorStyle[`Triggered Action`]} justify-center items-center`}>
            <div className={`text-[16pt] text-center ${actionTextColorStyle[`Triggered Action`]} font-bold`}>Remove Card</div>
        </div>
    );
}