import { actionTextColorStyle, cardbackColorStyle} from "../../types/ability-card-types.ts";
import {saveImage} from "../../utils/download-utils.ts";
import {Card, getCardTitle} from "../../types/card-list.ts";

export function DownloadCardButton({card, id}: {card: Card, id: string}) {
    const cardId = `${id}_${getCardTitle(card)}_card`;

    return (
        <div role='button' onClick={() => {
            saveImage(card, cardId);
        }} className={`flex flex-1 h-[40pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Routine`]} justify-center items-center`}>
            <div className={`text-[16pt] text-center ${actionTextColorStyle[`Routine`]} font-bold select-none`}>Download Card</div>
        </div>
    );
}
