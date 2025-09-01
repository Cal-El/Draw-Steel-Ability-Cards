import {getDynamicColorBase} from "../../types/ability-card-types.ts";
import {saveImage} from "../../utils/download-utils.ts";
import {Card, getCardTitle} from "../../types/card-list.ts";

export function DownloadCardButton({card, id}: {card: Card, id: string}) {
    const cardId = `${id}_${getCardTitle(card)}_card`;

    return (
        <div role='button' onClick={() => {
            saveImage(card, cardId);
        }} className={`flex flex-1 h-[40pt] rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
          style={{borderColor: getDynamicColorBase(card.type)}}>
            <div className={`text-[16pt] text-center font-bold select-none`}
                 style={{color:getDynamicColorBase(`Routine`)}}>Download Card</div>
        </div>
    );
}
