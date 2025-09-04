import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetWillingCreatures({card, bgColorGetter, numCreatures}: {card: ability_card, bgColorGetter: (t: string, s: CardTypeSettings) => string, numCreatures: string}){
    return (
        <TargetBox card={card} bgColorGetter={bgColorGetter}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[3.3333pt]`}>
                    <div
                        className={`font-body font-bold text-cardback leading-[12pt] small-caps text-center ${numCreatures === "3"? 'text-[13pt] lining-nums': 'text-[18pt]'}`}>{numCreatures}
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-[3.3333pt] small-caps text-center`}>Willing{numCreatures === "1" ? "" : "s"}
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creature{numCreatures === "1" ? "" : "s"}
                    </div>
                </div>
        </TargetBox>
    )
}
