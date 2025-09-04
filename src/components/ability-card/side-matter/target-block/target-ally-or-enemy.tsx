import { ability_card } from "../../../../types/ability-card-types";
import { ColourSet } from "../../../../types/card-settings";
import TargetBox from "./target-box";

export default function TargetAllyOrEnemy({card, bgColorGetter, numCreatures}: {card: ability_card, bgColorGetter: (t: string, s: ColourSet, b: ColourSet) => string, numCreatures: string}){
    return (
        <TargetBox card={card} bgColorGetter={bgColorGetter}>
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
