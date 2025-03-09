import {ability_card} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";

export function KeywordsList({card}: {card: ability_card}) {
    if (!card.keywords.length) return <></>
    return (
        <div className={`flex w-full gap-x-[2.85pt]`}>
            {card.keywords.map((k) => (
                <div className={`flex h-[15pt] w-[54.75pt] pt-[2pt] pr-[2pt] pl-[2pt] bg-keyword-backing items-center`}>
                    <h3 className={`text-[13.5pt] w-full font-display small-caps text-cardback text-center flex justify-center`}><AutoTextSize maxFontSizePx={18}>{k}</AutoTextSize></h3>
                </div>
            ))}
        </div>
    );
}