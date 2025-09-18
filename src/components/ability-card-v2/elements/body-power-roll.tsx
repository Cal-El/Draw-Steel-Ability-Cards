import {
  ability_card,
  all_characteristics,
  characteristic, damage,
  power_roll,
  power_roll_tier
} from "../../../types/ability-card.ts";
import {DamageBonus, HeroData, PotencyBonus} from "../../../types/character-data.ts";
import {
  getPrimaryColor,
  getTextColourOnBackground,
  getTextColourOnFadedPrimary,
  getTextColourOnPrimary
} from "../utils/color-calculator.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectThemeColours} from "../../../redux/card-settings-slice.ts";
import {ColourSettings} from "../../../types/card-settings.ts";

function commaSeparatedOrCharacteristicList(charOptions: characteristic[]) {
  if (charOptions.length === all_characteristics.length) {
    return 'Your Highest Characteristic Score'
  }
  return commaSeparatedOrString(charOptions);
}

function commaSeparatedOrString(strings: string[]) {
  if (strings.length === 1) {
    return strings[0]
  }
  if (strings.length === 2) {
    return strings.join(" or ")
  }

  return strings.map((s, i, arr) => {
    return (i + 1 >= arr.length ? "or " : "") + s;
  }).join(", ")
}

function getCustomisableCharacteristicBonusText({heroData, b}: {heroData: HeroData, b: power_roll}) {
  const charOptions = b.characteristicBonus as characteristic[]
  let bestBonus = -1;
  let bestBonusSet = false;
  if (charOptions.length === 0) {
    return "";
  }

  for (const c of charOptions) {
    if (heroData.characteristics.has(c)) {
      bestBonus = Math.max(bestBonus, heroData.characteristics.get(c) || -1)
      bestBonusSet = true
    } else {
      return commaSeparatedOrCharacteristicList(charOptions)
    }
  }

  if (!bestBonusSet && charOptions.length === all_characteristics.length) {
    return "Your Highest Characteristic Score"
  }
  return `${bestBonus}`
}

function CharacteristicBonus({card, heroData, b}: {card: ability_card, heroData: HeroData, b: power_roll}) {
  const colourSettings = useAppSelector(selectThemeColours);
  const powerRollStatementCss = {
    color: getTextColourOnBackground(card.type, colourSettings),
    fontWeight: 'bold',
    lineHeight: '9pt',
    fontSize: '9pt',
    paddingLeft: '12.5pt',
  };

  if (typeof b.characteristicBonus === 'string') {
    return <div style={powerRollStatementCss}>Power Roll + {b.characteristicBonus}:</div>
  }

  const customisableBonusText = getCustomisableCharacteristicBonusText({heroData, b})

  if (!customisableBonusText) {
    return <div style={powerRollStatementCss}>Power Roll +</div>
  }

  return <div style={powerRollStatementCss} className={`flex items-center h-[11pt]`}>Power Roll + <div style={{
    display: "block",
    color: getTextColourOnPrimary(card.type, colourSettings),
    fontWeight: 'bold',
    lineHeight: '7.5pt',
    fontSize: '7.5pt',
    fontVariantCaps: 'small-caps',
    textAlign: "center",
    border: "solid",
    borderWidth: "0.5pt",
    borderColor: getPrimaryColor(card.type, colourSettings),
    borderRadius: "2pt",
    backgroundColor: getPrimaryColor(card.type, colourSettings, 40),
    marginLeft: "1pt",
    marginRight: "1pt",
    paddingLeft: "2pt",
    paddingRight: "2pt",
    minWidth: "15pt",
    height: "9pt",
  }}>{customisableBonusText}</div>:</div>
}

function parseBaseDamageVal(tierNum: number, filteredBonuses: DamageBonus[], d: damage) {
  // Handle value with bonuses
  //
  const bonusTypes: Map<string, number> = new Map()
  let kitBonusOverridden = false;
  filteredBonuses.forEach(b => {
    bonusTypes.set(b.type, Math.max((bonusTypes.get(b.type) || 0), b.getBonusForTier(tierNum)))
    if (b.replaceKitValue) kitBonusOverridden = true;
  })
  let totalBonuses = 0
  for (const key of bonusTypes.keys()) {
    totalBonuses += bonusTypes.get(key) || 0
  }
  return d.baseValue + totalBonuses - (kitBonusOverridden ? d.includedKitValue : 0)
}

function getDamageBreakdown({t, tn, card, heroData}: {t: power_roll_tier, tn: number, card: ability_card, heroData: HeroData}) {
  if (!t.damage) {
    return undefined;
  }

  const damageBonuses = heroData.bonus.filter(b => b instanceof DamageBonus).filter(b => b.matchesKeywords(card.header.keywords));
  const meleeDamage = card.header.keywords.includes('Melee') ? parseBaseDamageVal(tn, damageBonuses.filter(b => !b.hasKeyword("Ranged")), t.damage) : undefined;
  const rangedDamage = card.header.keywords.includes('Ranged') ? parseBaseDamageVal(tn, damageBonuses.filter(b => !b.hasKeyword("Melee")), t.damage) : undefined;

  let displayDamage = meleeDamage ?? rangedDamage ?? t.damage.baseValue ?? 0;
  let altDisplayDamage = undefined;
  let displayCustomisableValue : string | undefined = undefined;

  if (meleeDamage && rangedDamage && meleeDamage !== rangedDamage) {
    altDisplayDamage = rangedDamage;
  }

  let failedCharacteristicPulling = false;
  let bestBonus = -5;
  for (const c of t.damage.characteristicBonusOptions) {
    if (heroData.characteristics.has(c)) {
      const val = heroData.characteristics.get(c) ?? 0
      bestBonus = Math.max(val, bestBonus)
    } else {
      failedCharacteristicPulling = true;
      break;
    }
  }
  if (!failedCharacteristicPulling) {
    displayDamage += bestBonus;
    if (altDisplayDamage) altDisplayDamage += bestBonus;
  } else {
    displayCustomisableValue = commaSeparatedOrString(t.damage.characteristicBonusOptions.map(c => c[0]));
  }

  return {
    displayDamage: displayDamage,
    altDisplayDamage: altDisplayDamage,
    displayCustomisableValue: displayCustomisableValue,
    otherBonus: t.damage?.otherBonus,
  }
}

const parsePotencyValue = ({t, card, heroData} : {t: power_roll_tier, card: ability_card, heroData: HeroData}) : number | string => {
  if (!t.potency) {
    return ''
  }
  const potencyBonuses = heroData.bonus.filter(b => b.matchesKeywords(card.header.keywords) && b instanceof PotencyBonus)
    .map(b => (b as PotencyBonus));

  let baseValue = t.potency.strength - 2;

  if (heroData.potencyCharacteristic && heroData.characteristics.has(heroData.potencyCharacteristic)) {
    baseValue += heroData.characteristics.get(heroData.potencyCharacteristic) ?? 0;
  } else {
    const characteristicBonuses = all_characteristics.filter(c => heroData.characteristics.has(c))
      .map(c => heroData.characteristics.get(c))
      .filter(c => c !== undefined);
    if (characteristicBonuses.length > 0) {
      baseValue += Math.max(...characteristicBonuses);
    } else {
      baseValue += 2; // assume a character with +2 in their best stat, and that stat is their potency bonus
    }
  }

  const bonusTypes: Map<string, number> = new Map();
  potencyBonuses.forEach(b => {
    bonusTypes.set(b.type, Math.max((bonusTypes.get(b.type) || 0), b.potencyIncrease))
  })
  let totalBonuses = 0
  for (const key of bonusTypes.keys()) {
    totalBonuses += bonusTypes.get(key) || 0
  }

  return baseValue + totalBonuses;
}

function appendSemiColonToEffect(s: string) : string {
  if (s.endsWith(';') || s.endsWith(' or')) {
    return s;
  }
  return `${s};`
}

function SideDingle({tn, card, colourSettings} : {tn: number, card: ability_card, colourSettings: ColourSettings}) {
  return <div style={{
    backgroundColor: getPrimaryColor(card.type, colourSettings),
    color: getTextColourOnPrimary(card.type, colourSettings),
  }} className={`my-[2pt] w-full bg-action-card flex justify-items-center`}>
    <div className={`[writing-mode:sideways-lr] text-[5pt] font-bold text-center`}>{tn === 1 ? '≤11' : tn === 2 ? '12-16' : '17+'}</div>
  </div>
}

function Tier({t, tn, card, heroData}: {t: power_roll_tier, tn: number, card: ability_card, heroData: HeroData}) {
  const colourSettings = useAppSelector(selectThemeColours);

  const damageBreakdown = getDamageBreakdown({t, tn, card, heroData});
  const potency = parsePotencyValue({t, card, heroData})

  return <div className={`col-span-full grid grid-cols-subgrid grid-rows-1 h-full`}>
    <SideDingle tn={tn} card={card} colourSettings={colourSettings}/>
    <div style={{backgroundColor: getPrimaryColor(card.type, colourSettings, tn === 2 ? 20 : 30)}} className={`col-span-1 flex gap-[2pt] h-full`}>
      {(damageBreakdown || t.baseEffect) && <div className={`flex justify-start items-center`}>
        {damageBreakdown && <div style={{
          backgroundColor: getPrimaryColor(card.type, colourSettings, tn === 2 ? 40 : 50),
          color: getTextColourOnPrimary(card.type, colourSettings),
          textAlign: 'center',
          fontSize: '12pt',
          fontWeight: 'bold',
          width: damageBreakdown?.altDisplayDamage ? '30pt' : '18pt',
        }}>{damageBreakdown?.displayDamage}{damageBreakdown?.altDisplayDamage && `|${damageBreakdown.altDisplayDamage}`}</div>}
        { (damageBreakdown?.displayCustomisableValue || damageBreakdown?.otherBonus) && <div style={{
          color: getTextColourOnBackground(card.type, colourSettings),
          fontWeight: 'normal',
          lineHeight: '8pt',
          fontSize: '8.5pt',
        }} className={`flex-none flex justify-start items-center h-full px-[1pt] gap-[1pt]`}>
          { damageBreakdown.otherBonus && <>
            {`+`}
            <div>{`${damageBreakdown?.otherBonus}`}</div>
          </>}
          { damageBreakdown.displayCustomisableValue && <>
            {`+`}
            <div style={{
              display: "block",
              color: getTextColourOnPrimary(card.type, colourSettings),
              fontWeight: 'bold',
              lineHeight: '7.5pt',
              fontSize: '7.5pt',
              fontVariantCaps: 'small-caps',
              textAlign: "center",
              border: "solid",
              borderWidth: "0.5pt",
              borderColor: getPrimaryColor(card.type, colourSettings),
              borderRadius: "2pt",
              backgroundColor: getPrimaryColor(card.type, colourSettings, 40),
              paddingLeft: "2pt",
              paddingRight: "2pt",
              minWidth: "15pt",
              height: "9pt",
            }}>
              {damageBreakdown?.displayCustomisableValue}
            </div>
          </>}
        </div>}
        <div style={{
          color: getTextColourOnFadedPrimary(card.type, colourSettings),
          fontWeight: 'normal',
          lineHeight: card.v2FontSizePtOverrides?.powerRoll ?? '8pt',
          fontSize: card.v2FontSizePtOverrides?.powerRoll ?? '8.5pt',
        }} className={`flex ${damageBreakdown ? 'pl-[1pt]' : 'pl-[2pt]'}`}>
          <div>{t.potency ? appendSemiColonToEffect(t.baseEffect ?? '') : t.baseEffect}</div>
        </div>
      </div>}
      {t.potency && <div className={`flex justify-start items-center gap-[2pt]`}>
        <div className={`flex`}>
          <div style={{
            display: "block",
            color: getTextColourOnPrimary(card.type, colourSettings),
            fontWeight: 'bold',
            lineHeight: '7.5pt',
            fontSize: '7.5pt',
            fontVariantCaps: 'small-caps',
            textAlign: "center",
            border: "solid",
            borderWidth: "0.5pt",
            borderColor: getPrimaryColor(card.type, colourSettings),
            borderRadius: "2pt",
            backgroundColor: getPrimaryColor(card.type, colourSettings, 40),
            paddingLeft: "2pt",
            paddingRight: "2pt",
            minWidth: "15pt",
            height: "9pt",
          }}>
            {`${t.potency?.characteristic[0]}\<${potency}`}
          </div>
          <div style={{
            color: getTextColourOnBackground(card.type, colourSettings),
            fontWeight: 'normal',
            lineHeight: '8pt',
            fontSize: '8.5pt',
          }}>,</div>
        </div>
        <div style={{
          color: getTextColourOnFadedPrimary(card.type, colourSettings),
          fontWeight: 'normal',
          lineHeight: card.v2FontSizePtOverrides?.powerRoll ?? '8pt',
          fontSize: card.v2FontSizePtOverrides?.powerRoll ?? '8.5pt',
          paddingRight: '1pt'
        }} className={`flex pl-[1pt]`}>
          <div>{t.potency?.effect}</div>
        </div>
      </div>}
    </div>
  </div>
}

export function BodyPowerRoll({card, heroData, b}: {card: ability_card, heroData: HeroData, b: power_roll}) {
  return <div className={`min-h-[64pt] w-full`}>
    <CharacteristicBonus card={card} heroData={heroData} b={b}/>
    <div className={`pl-[5pt] pr-[2pt] h-[54pt]`}>
      <div className={`grid grid-cols-[7pt_1fr] grid-rows-3 w-full h-full`}>
        <Tier t={b.t1} tn={1} card={card} heroData={heroData}/>
        <Tier t={b.t2} tn={2} card={card} heroData={heroData}/>
        <Tier t={b.t3} tn={3} card={card} heroData={heroData}/>
      </div>
    </div>
    <div className={`h-[2pt]`}/>
  </div>
}
