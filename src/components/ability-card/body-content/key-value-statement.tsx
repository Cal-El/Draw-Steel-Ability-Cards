import Markdown from "react-markdown";
import {ability_card, actionBg20ColorStyle, actionTextColorStyle, key_value_statement} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";

export function KeyValueStatement({card, kv}: {card: ability_card, kv: key_value_statement}) {
    if (kv.key === "Trigger") {
        return (
            <div className={`flex-auto flex ${actionBg20ColorStyle[card.type]} py-[3pt]`}>
                <div className={`w-[2pt] flex-none`}></div>
                <p className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><AutoTextSize maxFontSizePx={18} mode="box"><Markdown>{"**Trigger:** " + kv.value}</Markdown></AutoTextSize></p>
            </div>
        )
    }
    return (
        <div className={`flex-auto flex`}>
            <div className={`w-[2pt] flex-none`}></div>
            <p className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none whitespace-pre-line`}><AutoTextSize maxFontSizePx={18} mode="box"><Markdown>{(kv.key.length > 0 ? "**" + kv.key + "**: " : "") + kv.value}</Markdown></AutoTextSize></p>
        </div>
    )
}
