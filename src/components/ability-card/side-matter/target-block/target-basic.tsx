import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetBasic({card, bgColorStyle, text, fontSize, leading}: {card: ability_card, bgColorStyle: Record<string, string>, text: string, fontSize: number, leading: number}){
    return (
        <TargetBox card={card} bgColorStyle={bgColorStyle}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[2pt]`}>
                <div
                    className={`font-body font-bold text-cardback small-caps text-center`} style={{fontSize: `${fontSize}pt`, lineHeight: `${leading}pt`}}>{text}
                </div>
            </div>
        </TargetBox>
    )
}
