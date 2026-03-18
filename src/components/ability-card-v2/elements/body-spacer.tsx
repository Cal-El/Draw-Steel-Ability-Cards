import {spacer} from "../../../types/ability-card.ts";

export function BodySpacer({b}: {b: spacer}) {
  return <div style={{minHeight: `${b.sizePt}pt`}} className={'flex-none'}/>
}
