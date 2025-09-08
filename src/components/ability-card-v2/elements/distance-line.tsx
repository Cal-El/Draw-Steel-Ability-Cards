import {ability_card, distance_value} from "../../../types/ability-card.ts";
import {DistanceBonus, HeroData} from "../../../types/character-data.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectColourSettings} from "../../../redux/card-settings-slice.ts";
import {getPrimaryColor, getTextColourOnBackground, getTextColourOnPrimary} from "../utils/color-calculator.ts";

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

  return val.baseValue + totalBonuses - (shouldRemoveIncludedKitVal ? val.includedKitValue : 0);
}

export function DistanceLine({card, heroData} : { card: ability_card, heroData: HeroData }) {
  const colourSettings = useAppSelector(selectColourSettings);

  return <>
    {card.header.distance.display && <div style={{color: getTextColourOnBackground(card.type, colourSettings), fontWeight: 'bold', lineHeight: '8.5pt', fontSize: '8.5pt'}} className={`w-full text-left flex justify-start items-center`}>
      <span className={`font-dsGlyphs font-normal leading-none text-[11pt]`}>D</span>
      <div className={`w-full text-left flex justify-start items-center gap-[2pt]`}>
        {card.header.distance.display.split(`[`).map((v, i) => {
          if (v.includes(`]`)) {
            const vCloseSplit = v.split(']');
            if (i-1 < card.header.distance.values.length) {
              return <>
                <div key={`${i}`} style={{backgroundColor: getPrimaryColor(card.type, colourSettings, 40), color: getTextColourOnPrimary(card.type, colourSettings), borderColor: getPrimaryColor(card.type, colourSettings)}} className={`min-w-[15pt] h-[10pt] px-[2pt] border-[1pt] rounded-[2pt] border-orange-200 bg-orange-50 text-[8.5pt] text-stone-600 text-center font-bold flex justify-center items-center leading-none`}>
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
