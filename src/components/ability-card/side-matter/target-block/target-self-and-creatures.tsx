import { ability_card } from "../../../../types/ability-card-types";
import TargetBox from "./target-box";

export default function TargetSelfAndCreatures({card, bgColorStyle, numCreatures, creatureType, andOr}: 
    {card: ability_card, bgColorStyle: Record<string, string>, numCreatures: string, creatureType: "Creatures" | "Allies", andOr: "and" | "or"}){
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
        <TargetBox card={card} bgColorStyle={bgColorStyle}>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[7pt]`}>
                <div
                    className={`text-[9pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Self {andOr}
                </div>
                { numCreatures === "All" ? 
                <div
                    className={`text-[18pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>{numCreatures}
                </div>:
                <div
                    className={`${numCreatures === '3' ? `text-[16pt]` : `text-[24pt]`} font-body font-bold text-cardback leading-[10pt] small-caps text-center`}>{numCreatures}
                </div>
                }
                { creatureType === "Creatures" &&
                <div
                    className={`text-[7.5pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>{getTargetDescription()}
                </div>
                }
                { creatureType === "Allies" &&
                <div
                    className={`text-[10.5pt] font-body font-bold text-cardback leading-[14pt] small-caps text-center`}>{getTargetDescription()}
                </div>
                }
            </div>
        </TargetBox>
    )
}