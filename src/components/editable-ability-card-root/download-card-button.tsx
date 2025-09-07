import {saveImage} from "../../utils/download-utils.ts";
import {Card, getCardTitle} from "../../types/card-list.ts";
import {getPrimaryColor} from "../ability-card/utils/color-calculator.ts";

export function DownloadCardButton({card, id}: {card: Card, id: string}) {
    const cardId = `${id}_${getCardTitle(card)}_card`;

    return (
        <div role='button' onClick={() => {
            saveImage(card, cardId);
        }} className={`flex flex-1 h-[40pt] rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
          style={{borderColor: getPrimaryColor(card.type, {cardTypeColours: {}})}}>
            <div className={`text-[16pt] text-center font-bold select-none`}
                 style={{color:getPrimaryColor(`Routine`, {cardTypeColours: {}})}}>Download Card</div>
        </div>
    );
}
