import {ability_card, actionTextColorStyle} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";
import {KeywordsList} from "./keywords-list.tsx";

export function AbilityCardHeader({card}: { card: ability_card }) {
    return (
        <div className={`flex`}>
            <div className={`flex-none w-[3pt]`}></div>
            <div className={`w-[325.5pt]`}>
                <div className={`h-[3pt]`}/>
                <h2 className={`${card.hasCost ? 'w-[285.5pt]' : ''} text-[15pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-none indent-[2.4pt]`}><AutoTextSize maxFontSizePx={20}>{card.topMatter}</AutoTextSize></h2>
                <h1 className={`${card.hasCost ? 'w-[285.5pt]' : ''} text-[24pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-[19.5pt]`}><AutoTextSize maxFontSizePx={32}>{card.title}</AutoTextSize></h1>
                <KeywordsList card={card}/>
                <div className={`h-[1pt]`}></div>
                {card.flavour &&
                    <div className={`h-[30pt]`}>
                        <p className={`text-[13.5pt] h-full font-body italic font-light ${actionTextColorStyle[card.type]} leading-none`}><AutoTextSize mode="box" maxFontSizePx={26}>{card.flavour}</AutoTextSize></p>
                    </div>
                }
            </div>
        </div>
    );
}