import Markdown from "react-markdown";
import {
  ability_card, getDynamicColor20,
  getDynamicColorBase,
  key_value_statement
} from "../../../types/ability-card-types.ts";
import {AutoTextSize} from "auto-text-size";

export function KeyValueStatement({card, kv}: {card: ability_card, kv: key_value_statement}) {
    return (
        <div className={`flex-auto flex ${kv.key === "Trigger" && `py-[3pt]`} w-full`}
             style={kv.key === "Trigger" ? {backgroundColor: getDynamicColor20(card.type)} : {}}>
          <div className={`w-[2pt] flex-none`}></div>
          {!card.bodyFontSizeOverride ?
            // Old Flow: Uses AutoTextSize
            <p key={'autosized'} className={`max-w-[217pt] text-[9pt] font-body leading-none whitespace-pre-line`}
               style={{color:getDynamicColorBase(card.type)}}><AutoTextSize minFontSizePx={4} maxFontSizePx={18} mode="box"><Markdown>{(kv.key?.length > 0 ? "**" + kv.key + "**: " : "") + kv.value}</Markdown></AutoTextSize></p>
            :
            // New Flow: Uses body fontsize override
            <p key={'override'} className={`max-w-[217pt] font-body leading-none whitespace-pre-line`}
               style={{color:getDynamicColorBase(card.type), fontSize: card.bodyFontSizeOverride}}><Markdown>{(kv.key?.length > 0 ? "**" + kv.key + "**: " : "") + kv.value}</Markdown></p>
          }
        </div>
    )
}
