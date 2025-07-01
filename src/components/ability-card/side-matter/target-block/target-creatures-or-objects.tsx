import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetCreaturesOrObjects({card, bgColorStyle, numCreatures}: {card: ability_card, bgColorStyle: Record<string, string>, numCreatures: string}){
    return (
        <TargetBox card={card} bgColorStyle={bgColorStyle}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[3.3333pt]`}>
                    <div
                        className={`font-body font-bold text-cardback leading-[12pt] small-caps text-center ${numCreatures === "3"? 'text-[13pt] lining-nums': 'text-[16pt]'}`}>{numCreatures}
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-[3.3333pt] small-caps text-center`}>Creature{numCreatures === "1" ? "" : "s"}
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>or Object{numCreatures === "1" ? "" : "s"}
                    </div>
                </div>
        </TargetBox>
    )
}
