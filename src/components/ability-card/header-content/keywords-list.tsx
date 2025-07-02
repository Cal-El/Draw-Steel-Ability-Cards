import {ability_card} from "../../../types/ability-card-types.ts";

export function KeywordsList({card}: {card: ability_card}) {
    if (!card.keywords.length) return <></>
    return (
        <div className={`flex w-full gap-x-[1.9pt]`}>
            {card.keywords.map((k) => (
                <div className={`flex h-[10pt] min-w-[30pt] pt-[1.333pt] pr-[1.333pt] pl-[1.333pt] bg-keyword-backing items-center`}>
                    <h3 className={`text-[9pt] w-full font-display small-caps text-cardback text-center flex justify-center`}>{k}</h3>
                </div>
            ))}
        </div>
    );
}
