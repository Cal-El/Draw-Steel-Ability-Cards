import Markdown from "react-markdown";
import {
  ability_card, 
  key_value_statement
} from "../../../types/ability-card-types.ts";
import {
  getDynamicColor20,
  getDynamicColorBase
} from "../../../utils/color-calculator.ts";
import {AutoTextSize} from "auto-text-size";
import { selectBaseColours, selectCardTypeSettingsByCardType } from "../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../redux/hooks.ts";

export function KeyValueStatement({card, kv}: {card: ability_card, kv: key_value_statement}) {
<<<<<<< HEAD
  const key = kv.key ?? ''
  const useBacking = key === 'Trigger' || key.startsWith('#')
  const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}
  const baseColours = useAppSelector(selectBaseColours) ?? {}

    return (
        <div className={`flex-auto flex ${useBacking && `py-[3pt]`} w-full`}
             style={useBacking ? {backgroundColor: getDynamicColor20(card.type, cardTypeSettings, baseColours)} : {}}>
          <div className={`w-[2pt] flex-none`}></div>
          {!card.bodyFontSizeOverride ?
            // Old Flow: Uses AutoTextSize
            <p key={'autosized'} className={`max-w-[217pt] text-[9pt] font-body leading-none whitespace-pre-line`}
               style={{color:getDynamicColorBase(card.type, cardTypeSettings, baseColours)}}><AutoTextSize minFontSizePx={4} maxFontSizePx={18} mode="box"><Markdown>{(key?.length > 0 ? "**" + key.replace('#', '') + "**: " : "") + kv.value}</Markdown></AutoTextSize></p>
            :
            // New Flow: Uses body fontsize override
            <p key={'override'} className={`max-w-[217pt] font-body leading-none whitespace-pre-line`}
               style={{color:getDynamicColorBase(card.type, cardTypeSettings, baseColours), fontSize: card.bodyFontSizeOverride}}><Markdown>{(key?.length > 0 ? "**" + key.replace('#', '') + "**: " : "") + kv.value}</Markdown></p>
          }
        </div>
    )
}
