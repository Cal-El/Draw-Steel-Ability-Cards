import { ability_card } from "../../../../types/ability-card-types";
import { ColourSet } from "../../../../types/card-settings";
import TargetBox from "./target-box";

export default function TargetBasic({card, bgColorGetter, text, fontSize, leading}: {card: ability_card, bgColorGetter: (t: string, s: ColourSet, b: ColourSet) => string, text: string, fontSize: number, leading: number}){
    return (
        <TargetBox card={card} bgColorGetter={bgColorGetter}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[2pt]`}>
                <div
                    className={`font-body font-bold text-cardback small-caps text-center`} style={{fontSize: `${fontSize}pt`, lineHeight: `${leading}pt`}}>{text}
                </div>
            </div>
        </TargetBox>
    )
}
