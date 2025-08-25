import Markdown from "react-markdown";
import {ability_card, actionBg20ColorStyle, actionTextColorStyle, key_value_statement} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";

export function KeyValueStatement({card, kv}: {card: ability_card, kv: key_value_statement}) {
    return (
        <div className={`flex-auto flex ${kv.key === "Trigger" && `${actionBg20ColorStyle[card.type]} py-[3pt]`} w-full`}>
          <div className={`w-[2pt] flex-none`}></div>
          {!card.bodyFontSizeOverride ?
            // Old Flow: Uses AutoTextSize
            <p key={'autosized'} className={`max-w-[217pt] text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none whitespace-pre-line`}><AutoTextSize maxFontSizePx={18} mode="box"><Markdown>{(kv.key?.length > 0 ? "**" + kv.key + "**: " : "") + kv.value}</Markdown></AutoTextSize></p>
            :
            // New Flow: Uses body fontsize override
            <p key={'override'} style={{fontSize: card.bodyFontSizeOverride}} className={`max-w-[217pt] font-body ${actionTextColorStyle[card.type]} leading-none whitespace-pre-line`}><Markdown>{(kv.key?.length > 0 ? "**" + kv.key + "**: " : "") + kv.value}</Markdown></p>
          }
        </div>
    )
}
