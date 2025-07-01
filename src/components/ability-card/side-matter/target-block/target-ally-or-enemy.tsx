import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetAllyOrEnemy({card, bgColorStyle, numCreatures}: {card: ability_card, bgColorStyle: Record<string, string>, numCreatures: string}){
    return (
        <TargetBox card={card} bgColorStyle={bgColorStyle}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[3.3333pt]`}>
                    <div
                        className={`text-[16pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center ${numCreatures === "3"? 'lining-nums': ''}`}>{numCreatures}
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-[3.3333pt] small-caps text-center`}>All{numCreatures === "1" ? "y" : "ies"} or
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Enem{numCreatures === "1" ? "y" : "ies"}
                    </div>
                </div>
        </TargetBox>
    )
}
