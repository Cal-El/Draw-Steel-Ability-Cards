import { selectCardTypeSettingsByCardType } from "../../../redux/card-settings-slice.ts";
import { useAppSelector } from "../../../redux/hooks.ts";
import {
  ability_card,
  distance_block} from "../../../types/ability-card-types.ts";
import { CardTypeSettings } from "../../../types/card-settings.ts";
import {
  getDynamicColor40,
  getDynamicColor50,
  getDynamicColorBase
} from "../../../utils/color-calculator.ts";

function distanceBlock(card: ability_card, block: distance_block, bgColorGetter: (t: string, s: CardTypeSettings) => string) {
    const cardTypeSettings = useAppSelector(selectCardTypeSettingsByCardType(card.type)) ?? {}

    if (block.distanceValue.length === 1 || block.distanceValue.length === 2) {
        return (
            <div className={`relative w-[27pt] h-[27pt]`}
                 style={{backgroundColor:bgColorGetter(card.type, cardTypeSettings)}}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                     style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[16pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Line of Effect') {
        return (
            <div className={`relative w-[27pt] h-[27pt]`}
                 style={{backgroundColor:bgColorGetter(card.type, cardTypeSettings)}}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                     style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[6pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Line of
                    </div>
                    <div
                        className={`text-[8pt] font-body font-bold text-cardback leading-[5.3333pt] small-caps text-center`}>Effect
                    </div>
                </div>
            </div>
        )
    } else if (block.distanceValue === 'Special') {
        return (
            <div className={`relative w-[27pt] h-[27pt]`}
                 style={{backgroundColor:bgColorGetter(card.type, cardTypeSettings)}}>
            <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                     style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[7pt] font-body font-bold text-cardback leading-[5.3333pt] small-caps text-center`}>Special</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative w-[27pt] h-[27pt]`}
             style={{backgroundColor:bgColorGetter(card.type, cardTypeSettings)}}>
        <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold leading-none small-caps indent-[0.4pt]`}
                 style={{color:getDynamicColorBase(card.type, cardTypeSettings)}}>{block.distanceHeader}</div>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                <div className={`text-[11pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
            </div>
        </div>
    )
}

export function DistanceBlockList({card}: {card: ability_card}) {
    return (<>
        {card.distance.map((b, i) => distanceBlock(
            card,
            b,
            i % 2 === 0 ? getDynamicColor50 : getDynamicColor40
        ))}
    </>);
}
