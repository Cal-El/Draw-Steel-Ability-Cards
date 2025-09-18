import {ability_card} from "../../../types/ability-card.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectThemeColours} from "../../../redux/card-settings-slice.ts";
import {
  getTextColourOnBackground,
  getTextColourOnSecondary
} from "../utils/color-calculator.ts";
import {HeaderDivider} from "../ability-cardback.tsx";

export function UpperHeader({card} : { card: ability_card }) {
  const colourSettings = useAppSelector(selectThemeColours);

  return <div id={'header'} className={`w-full h-min flex pl-[1pt] pr-[7pt]`}>
    <div id={`cost`} className={`w-[12pt] h-0 flex-none overflow-visible`}>
      <div className={`w-[12pt] h-[28pt] flex justify-center items-center`}>
        <div style={{color: getTextColourOnSecondary(card.type, colourSettings), letterSpacing: '-2pt', textIndent: '-2pt', fontSize: '10pt', fontWeight: 'bold', textAlign: 'center', lineHeight: '9pt', fontVariantNumeric: 'lining-nums'}}>{card.cost?.costValue}</div>
      </div>
    </div>
    <div id={`header-title-and-flavour`}>
      <div style={{color: getTextColourOnBackground(card.type, colourSettings), fontVariantCaps: 'small-caps', fontSize: `${card.v2FontSizePtOverrides?.titleFont ?? 13}pt`, fontWeight: 'bold', lineHeight: `${card.v2FontSizePtOverrides?.titleFont ?? 13 - 2.5}pt`}}>{card.header.title}</div>
      {card.header.flavour ? <>
        <div style={{color: getTextColourOnBackground(card.type, colourSettings), paddingTop: '0pt', paddingBottom: '1pt', fontSize: `${card.v2FontSizePtOverrides?.flavour ?? 8}pt`, fontWeight: 'normal', fontStyle: 'italic', lineHeight: `${card.v2FontSizePtOverrides?.flavour ?? 8 - 0.5}pt`, lineClamp: 2, textIndent: '3pt'}}>{card.header.flavour}</div>
        <HeaderDivider card={card} className={'h-[3pt] mb-[1.5pt] w-full flex justify-left items-center'}/>
      </> : <>
        <HeaderDivider card={card} className={'pl-[3pt] mt-[2.5pt] mb-[1.5pt] h-[3pt] w-full flex justify-left items-center'}/>
      </>}
    </div>
  </div>
}
