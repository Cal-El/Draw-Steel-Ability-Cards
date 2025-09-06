import {ability_card, distance_value, effect} from "../../types/ability-card.ts";
import AbilityCardback, {HeaderDivider} from "./ability-cardback.tsx";
import {DistanceBonus, HeroData} from "../../types/character-data.ts";
import Markdown from "react-markdown";
import {
  getBackgroundColor,
  getCustomColour,
  getDynamicColor20,
  getDynamicColor30,
  getDynamicColorBase,
  getKeywordColor
} from "../../utils/color-calculator.ts";
import {useAppSelector} from "../../redux/hooks.ts";
import {selectColourSettings} from "../../redux/card-settings-slice.ts";

function getDisplayedDistanceValue(card: ability_card, heroData: HeroData, val: distance_value) : number {
  let shouldRemoveIncludedKitVal = false;
  let totalBonuses = 0;
  const maxBonusByType : Map<string, number> = new Map();

  heroData.bonus.filter(s => s instanceof DistanceBonus && s.matchesKeywords(card.header.keywords) && s.distanceType === val.type)
    .map(s => {
      if (!(s instanceof DistanceBonus)) return;
      if (maxBonusByType.has(s.type)) {
        totalBonuses -= maxBonusByType.get(s.type) ?? 0;
        maxBonusByType.set(s.type, Math.max(s.value, maxBonusByType.get(s.type) ?? 0))
        totalBonuses += Math.max(s.value, maxBonusByType.get(s.type) ?? 0)
      } else {
        totalBonuses += s.value;
      }
      if (s.replaceKitValue) shouldRemoveIncludedKitVal = true;
    })

  console.log(val.baseValue, totalBonuses, shouldRemoveIncludedKitVal, (shouldRemoveIncludedKitVal ? val.includedKitValue : 0))

  return val.baseValue + totalBonuses - (shouldRemoveIncludedKitVal ? val.includedKitValue : 0);
}

function DistanceLine({card, heroData} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <>
    {card.header.distance.display && <div style={{color: getDynamicColorBase(card.type, colourSettings), fontWeight: 'bold', lineHeight: '8.5pt', fontSize: '8.5pt'}} className={`w-full text-left flex justify-start items-center`}>
      <span className={`font-dsGlyphs font-normal leading-none text-[11pt]`}>D</span>
      <div className={`w-full text-left flex justify-start items-center gap-[2pt]`}>
        {card.header.distance.display.split(`[`).map((v, i) => {
          if (v.includes(`]`)) {
            const vCloseSplit = v.split(']');
            if (i-1 < card.header.distance.values.length) {
              return <>
                <div key={`${i}`} style={{backgroundColor: getDynamicColor30(card.type, colourSettings), color: 'white', borderColor: getDynamicColorBase(card.type, colourSettings)}} className={`min-w-[15pt] h-[10pt] px-[2pt] border-[1pt] rounded-[2pt] border-orange-200 bg-orange-50 text-[8.5pt] text-stone-600 text-center font-bold flex justify-center items-center leading-none`}>
                  <div className={`h-[8.6pt]`}>
                    {getDisplayedDistanceValue(card, heroData, card.header.distance.values[i - 1])}
                  </div>
                </div>
                <div key={`${i+'a'}`}>{vCloseSplit[1]}</div>
              </>
            }
          }
          return v;
        })}
      </div>
    </div>}
  </>
}

function TopMatter({card} : { card: ability_card }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div id={'top-text'} className={`w-full h-[11pt] flex justify-between pl-[13pt] pt-[0pt] pr-[8pt]`}>
    <div style={{color: getDynamicColorBase(card.type, colourSettings), fontSize: '7.5pt', fontWeight: 700}}>{card.header.topMatter}</div>
    <div style={{color: getDynamicColorBase(card.type, colourSettings), fontSize: '7.5pt', fontWeight: 700}}>{card.type}</div>
  </div>
}

function UpperHeader({card} : { card: ability_card }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div id={'header'} className={`w-full h-min flex pl-[1pt] pr-[7pt]`}>
    <div id={`cost`} className={`w-[12pt] h-0 flex-none overflow-visible`}>
      <div className={`w-[12pt] h-[28pt] flex justify-center items-center`}>
        <div style={{color: getDynamicColorBase(card.type, colourSettings), letterSpacing: '-2pt', textIndent: '-2pt', fontSize: '10pt', fontWeight: 'bold', textAlign: 'center', lineHeight: '9pt', fontVariantNumeric: 'lining-nums'}}>{card.cost?.costValue}</div>
      </div>
    </div>
    <div id={`header-title-and-flavour`}>
      <div style={{color: getDynamicColorBase(card.type, colourSettings), fontVariantCaps: 'small-caps', fontSize: card.v2FontSizePtOverrides?.titleFont || '13pt', fontWeight: 'bold', lineHeight: '10.5pt'}}>{card.header.title}</div>
      {card.header.flavour ? <>
        <div style={{color: getDynamicColorBase(card.type, colourSettings), paddingTop: '0pt', paddingBottom: '1pt', fontSize: card.v2FontSizePtOverrides?.flavour || '8pt', fontWeight: 'normal', fontStyle: 'italic', lineHeight: '7.5pt', lineClamp: 2, textIndent: '3pt'}}>{card.header.flavour}</div>
        <HeaderDivider card={card} className={'h-[3pt] mb-[1.5pt] w-full flex justify-left items-center'}/>
      </> : <>
        <HeaderDivider card={card} className={'pl-[3pt] mt-[2.5pt] mb-[1.5pt] h-[3pt] w-full flex justify-left items-center'}/>
      </>}
    </div>
  </div>
}

function LowerHeader({card, heroData} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div className={``}>
    <div id={`keywords`} className={`pl-[13pt] flex gap-[2pt]`}>
      {card.header.keywords.map(k => {
        return <div key={k}
                    style={{borderColor: getKeywordColor(card.type, colourSettings), backgroundColor: getCustomColour(getKeywordColor(card.type, colourSettings), getBackgroundColor(card.type, colourSettings), 20)}}
                    className={`min-w-[25pt] px-[2pt] border-[1pt] rounded-[2pt] border-orange-200 bg-orange-50 text-[7pt] text-gray-600 text-center font-bold leading-none py-[0.5pt]`}
        >
          {k}
        </div>
      })}
    </div>
    {(card.header.distance.display || card.header.distance.display) && <div id={'target-and-distance'} className={`pl-[13pt] pr-[7pt] w-full flex justify-between mt-[1pt] mb-[2pt]`}>
      <DistanceLine card={card} heroData={heroData} />
      {card.header.target && <div style={{color: getDynamicColorBase(card.type, colourSettings), fontWeight: 'bold', lineHeight: '8.5pt', fontSize: '8.5pt'}} className={`w-full text-right flex justify-end items-center`}>
        <span className={`font-dsGlyphs font-normal leading-none text-[11pt]`}>T</span>{card.header.target}
      </div>}
    </div>}
  </div>
}

function Body({card, heroData} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <div className={`w-full pl-[10.5pt] pr-[2pt]`}>
    {card.body.filter(b => (b as effect).isEffect)
      .map(b => b as effect)
      .map(b => {
        const title = b.title ?? ''
        const useBacking = title === 'Trigger' || title.startsWith('#')

        return <div>
          <div style={{
            backgroundColor: useBacking ? getDynamicColor20(card.type, colourSettings) : 'transparent',
            color: getDynamicColorBase(card.type, colourSettings),
            fontWeight: 'normal',
            lineHeight: card.v2FontSizePtOverrides?.body ?? '8pt',
            fontSize: card.v2FontSizePtOverrides?.body ?? '8pt',
          }} className={`${useBacking ? 'pt-[2pt]' : ''} pb-[3pt] px-[3pt] `}>
            <Markdown>
              {`${title ? `**${title.replace('#', '')}**` : ''}: ${b.body}`}
            </Markdown>
          </div>
        </div>
      })
    }

  </div>
}

export default function AbilityCardV2({id, card, heroData, enlargedState}: {id: string, card: ability_card, heroData: HeroData, enlargedState: number}) {
  return <div id={`${id}_${card.header.title}_card`} className={`font-v2Card flex-none flex justify-center items-center print:h-[180pt] print:w-[252pt] ${enlargedState > 0 ? 'h-[360pt] w-[504pt]' : enlargedState < 0 ? 'h-[180pt] w-[252pt]' : 'h-[270pt] w-[378pt]'}`}>
    <div className={`h-[180pt] w-[252pt] print:scale-[1] ${enlargedState > 0 ? 'scale-[2]' : enlargedState < 0 ? 'scale-[1]' : 'scale-[1.5]'}`}>
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <AbilityCardback card={card} />
      </div>
      <div className={`h-[180pt] w-[252pt] absolute top-0`}>
        <TopMatter card={card}/>
        <UpperHeader card={card}/>
        <LowerHeader card={card} heroData={heroData}/>
        <Body card={card} heroData={heroData}/>
      </div>
    </div>
  </div>
}
