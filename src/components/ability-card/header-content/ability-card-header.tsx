import {ability_card, actionTextColorStyle} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";
import {KeywordsList} from "./keywords-list.tsx";

export function AbilityCardHeader({card}: { card: ability_card }) {
    return (
        <div className={`flex`}>
            <div className={`flex-none w-[3pt]`}></div>
            <div className={`w-[217pt]`}>
                <div className={`h-[2pt]`}/>
                <div className={`${card.hasCost ? 'w-[190pt]' : 'w-[217pt]'} h-[10pt]`}>
                    <h2 className={`text-[10pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-none indent-[1.8pt]`}><AutoTextSize maxFontSizePx={14}>{card.topMatter}</AutoTextSize></h2>
                </div>
                <div className={`${card.hasCost ? 'w-[190pt]' : 'w-[217pt]'} h-[14pt]`}>
                    <h1 className={`${card.hasCost ? 'w-[190pt]' : 'w-[217pt]'} text-[18pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-[13pt]`}><AutoTextSize maxFontSizePx={22}>{card.title}</AutoTextSize></h1>
                </div>
                <KeywordsList card={card}/>
                <div className={`h-[0.5pt]`}></div>
                {card.flavour &&
                    <div className={`h-[20pt]`}>
                        <div className={`text-[9pt] h-full font-body italic font-light ${actionTextColorStyle[card.type]} leading-none`}><AutoTextSize mode="box" maxFontSizePx={17}>{card.flavour}</AutoTextSize></div>
                    </div>
                }
            </div>
        </div>
    );
}
