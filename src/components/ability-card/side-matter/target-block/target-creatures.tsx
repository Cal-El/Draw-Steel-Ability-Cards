import { ability_card } from "../../../../types/ability-card-types";
import { ColourSet } from "../../../../types/card-settings";
import TargetBox from "./target-box";

export default function TargetCreatures({card, bgColorGetter, numCreatures, type}: {card: ability_card, bgColorGetter: (t: string, s: ColourSet, b: ColourSet) => string, numCreatures: string, type: "Creatures" | "Enemies" | "Allies"}){
    const getTargetDescription = (): string => {
        switch(type){
            case "Creatures":
                return `Creature${numCreatures === "1" ? "" : "s"}`
            case "Enemies":
                return `${numCreatures === "1" ? "Enemy" : "Enemies"}`
            case "Allies":
                return `${numCreatures === "1" ? "Ally" : "Allies"}`
            default:
                return ""
        }
    }
    return (
        <TargetBox card={card} bgColorGetter={bgColorGetter}>
            <div className={`flex flex-col justify-center items-center w-full h-full pt-[1.3333pt]`}>
                { numCreatures === "All" ? 
                <div
                    className={`text-[12pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>{numCreatures}
                </div>:
                <div
                    className={`${numCreatures === '3' ? `text-[13pt] lining-nums` : `text-[16pt]`} font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>{numCreatures}
                </div>
                }
                { type === "Creatures" &&
                <div
                    className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{getTargetDescription()}
                </div>
                }
                { type === "Enemies" &&
                <div
                    className={`text-[6pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{getTargetDescription()}
                </div>
                }
                { type === "Allies" &&
                <div
                    className={`text-[7pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{getTargetDescription()}
                </div>
                }
            </div>
        </TargetBox>
    )
}
