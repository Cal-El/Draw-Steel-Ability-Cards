import {ability_card} from "../../../types/ability-card-types.ts";
import { getDynamicColorBase } from "../../../utils/color-calculator.ts";
import {AutoTextSize} from "auto-text-size";
import {KeywordsList} from "./keywords-list.tsx";
import { useAppSelector } from "../../../redux/hooks.ts";
import { selectCardTypeSettingsByCardType } from "../../../redux/card-settings-slice.ts";

export function AbilityCardHeader({card}: { card: ability_card }) {
    const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}
    return (
        <div className={`flex`}>
            <div className={`flex-none w-[3pt]`}></div>
            <div className={`w-[219pt]`}>
                <div className={`h-[2pt]`}/>
                <div className={`${card.hasCost ? 'w-[190pt]' : 'w-[219pt]'} h-[10pt]`}>
                  {!card.topMatterFontSizeOverride ?
                    // Old Flow: Uses AutoTextSize
                    <h2 className={`text-[10pt] font-display font-bold small-caps leading-none indent-[1.8pt]`}
                        style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}><AutoTextSize maxFontSizePx={14}>{card.topMatter}</AutoTextSize></h2>
                    :
                    // New Flow: Uses top matter fontsize override
                    <h2 className={`font-display font-bold small-caps leading-none indent-[1.8pt]`}
                        style={{color:getDynamicColorBase(card.type, cardTypeSettings), fontSize: card.topMatterFontSizeOverride}}>{card.topMatter}</h2>
                  }
                </div>
                <div className={`${card.hasCost ? 'w-[190pt]' : 'w-[219pt]'} h-[14pt]`}>
                  {!card.titleFontSizeOverride ?
                    // Old Flow: Uses AutoTextSize
                    <h1 className={`${card.hasCost ? 'w-[190pt]' : 'w-[219pt]'} text-[18pt] font-display font-bold small-caps leading-[13pt]`}
                        style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}><AutoTextSize maxFontSizePx={22}>{card.title}</AutoTextSize></h1>
                    :
                    // New Flow: Uses title fontsize override
                    <h1 className={`${card.hasCost ? 'w-[190pt]' : 'w-[219pt]'} font-display font-bold small-caps leading-[13pt]`}
                        style={{color:getDynamicColorBase(card.type, cardTypeSettings), fontSize: card.titleFontSizeOverride}}>{card.title}</h1>
                  }
                </div>
                <KeywordsList card={card}/>
                <div className={`h-[0.5pt]`}></div>
                {card.flavour &&
                  <div className={`h-[20pt]`}>
                    {!card.flavourFontSizeOverride ?
                      // Old Flow: Uses AutoTextSize
                      <div className={`text-[9pt] h-full font-body italic font-light leading-none`}
                           style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}><AutoTextSize mode="box" maxFontSizePx={17}>{card.flavour}</AutoTextSize></div>
                      :
                      // New Flow: Uses flavour fontsize override
                      <div className={`h-full font-body italic font-light leading-none`}
                           style={{color:getDynamicColorBase(card.type, cardTypeSettings), fontSize: card.flavourFontSizeOverride}}>{card.flavour}</div>
                    }
                  </div>
                }
            </div>
        </div>
    );
}
