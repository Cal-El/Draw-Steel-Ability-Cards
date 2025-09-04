import { selectBaseColours, selectCardTypeSettingsByCardType } from "../../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../../redux/hooks.ts";
import {ability_card} from "../../../../types/ability-card-types.ts";
import { ColourSet } from "../../../../types/card-settings.ts";
import { getDynamicColorBase } from "../../../../utils/color-calculator.ts";

export default function TargetBox({card, bgColorGetter, children}: {card: ability_card, bgColorGetter: (t: string, s: ColourSet, b: ColourSet) => string, children?: JSX.Element | JSX.Element[]}){
    const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}
    const baseColours = useAppSelector(selectBaseColours) ?? {}
    return (
        <div className={`w-[27pt] h-[27pt]`}
             style={{backgroundColor: bgColorGetter(card.type, cardTypeSettings, baseColours)}}>
            <div
                className={`overflow-visible h-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                style={{color:getDynamicColorBase(card.type, cardTypeSettings, baseColours)}}>Target
            </div>
            {children}
        </div>
    )
}
