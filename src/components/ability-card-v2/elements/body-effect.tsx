import {getPrimaryColor, getTextColourOnBackground} from "../utils/color-calculator.ts";
import Markdown from "react-markdown";
import {ability_card, effect} from "../../../types/ability-card.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectColourSettings} from "../../../redux/card-settings-slice.ts";

export function BodyEffect({card, b}: {card: ability_card, b: effect}) {
  const colourSettings = useAppSelector(selectColourSettings);

  const title = b.title ?? ''
  const useBacking = title === 'Trigger' || title.startsWith('#')

  return <div className={`w-full pl-[10.5pt] pr-[2pt]`}>
    <div style={{
      backgroundColor: useBacking ? getPrimaryColor(card.type, colourSettings, 20) : 'transparent',
      color: getTextColourOnBackground(card.type, colourSettings),
      fontWeight: 'normal',
      lineHeight: card.v2FontSizePtOverrides?.body ?? '8pt',
      fontSize: card.v2FontSizePtOverrides?.body ?? '8pt',
    }} className={`${useBacking ? 'pt-[2pt]' : ''} pb-[3pt] px-[3pt] `}>
      <Markdown>
        {`${title ? `**${title.replace('#', '')}**` : ''}: ${b.body}`}
      </Markdown>
    </div>
  </div>
}
