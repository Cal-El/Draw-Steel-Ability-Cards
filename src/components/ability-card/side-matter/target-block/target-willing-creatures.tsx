import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetWillingCreatures({card, bgColorStyle, numCreatures}: {card: ability_card, bgColorStyle: Record<string, string>, numCreatures: string}){
    return (
        <TargetBox card={card} bgColorStyle={bgColorStyle}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[5pt]`}>
                    <div
                        className={`font-body font-bold text-cardback leading-[18pt] small-caps text-center ${numCreatures === "3"? 'text-[20pt] lining-nums': 'text-[24pt]'}`}>{numCreatures}
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-[5pt] small-caps text-center`}>Willing{numCreatures === "1" ? "" : "s"}
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creature{numCreatures === "1" ? "" : "s"}
                    </div>
                </div>
        </TargetBox>
    )
}
