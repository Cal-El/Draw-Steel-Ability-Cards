import { ability_card } from "../../../../types/ability-card-types";
import { ColourSet } from "../../../../types/card-settings";
import TargetBox from "./target-box";

export default function TargetSelfAndCreatures({card, bgColorGetter, numCreatures, creatureType, andOr}:
    {card: ability_card, bgColorGetter: (t: string, s: ColourSet, b: ColourSet) => string, numCreatures: string, creatureType: "Creatures" | "Allies", andOr: "and" | "or"}){
    const getTargetDescription = (): string => {
        switch(creatureType){
            case "Creatures":
                return `Creature${numCreatures === "1" ? "" : "s"}`
            case "Allies":
                return `${numCreatures === "1" ? "Ally" : "Allies"}`
            default:
                return ""
        }
    }
    return (
        <TargetBox card={card} bgColorGetter={bgColorGetter}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[5.3333pt]`}>
                <div
                    className={`text-[6pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Self {andOr}
                </div>
                { numCreatures === "All" ? 
                <div
                    className={`text-[12pt] font-body font-bold text-cardback leading-[8pt] small-caps text-center`}>{numCreatures}
                </div>:
                <div
                    className={`${numCreatures === '3' ? `text-[11pt]` : `text-[16pt]`} font-body font-bold text-cardback leading-[6pt] small-caps text-center`}>{numCreatures}
                </div>
                }
                { creatureType === "Creatures" &&
                <div
                    className={`text-[5pt] font-body font-bold text-cardback leading-[8pt] small-caps text-center`}>{getTargetDescription()}
                </div>
                }
                { creatureType === "Allies" &&
                <div
                    className={`text-[7pt] font-body font-bold text-cardback leading-[9pt] small-caps text-center`}>{getTargetDescription()}
                </div>
                }
            </div>
        </TargetBox>
    )
}
