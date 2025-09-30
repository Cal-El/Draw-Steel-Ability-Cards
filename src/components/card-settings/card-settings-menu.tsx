import {SectionSeparator} from "../edit-card-sidebar/card-editor/common-editor-elements";
import ThemeMenu from "./theme-menu";
import {ThemeBasedCard} from "../theme-based-card.tsx";
import {ability_card, abilityType, characteristic, potency_strength} from "../../types/ability-card.ts";
import {CardStyleSelector} from "./card-style-selector.tsx";
import BaseColourMenu from "./base-colour-menu.tsx";
import {CardTypesColourMenu} from "./card-types-colour-menu.tsx";
import {CardStyleVariantSelector} from "./card-style-variant-selector.tsx";

const dummyCard: ability_card = {
  version: 2,
  level: 1,
  type: abilityType.mainAction,
  header: {
    topMatter: "Level 1 Example Ability",
    title: "This is a Card Title",
    flavour: "Such fantastic flavour",
    keywords: ['Melee', 'Ranged', 'Strike', 'Weapon'],
    distance: {
      display: "Melee [1] or Ranged [10]",
      values: [
        {
          type: "Melee",
          baseValue: 1,
          includedKitValue: 0,
        },
        {
          type: "Ranged",
          baseValue: 10,
          includedKitValue: 0,
        }
      ]
    },
    target: "One creature or object"
  },
  body: [
    {
      isEffect: true,
      title: 'Trigger',
      body: 'This is a trigger'
    },
    {
      isPowerRoll: true,
      characteristicBonus: [characteristic.REASON, characteristic.INTUITION, characteristic.PRESENCE],
      t1: {
        damage: {
          baseValue: 4,
          includedKitValue: 2,
          characteristicBonusOptions: [characteristic.REASON, characteristic.INTUITION, characteristic.PRESENCE],
        },
        baseEffect: 'damage; bleeding (EoT), or',
        potency: {
          strength: potency_strength.WEAK,
          characteristic: characteristic.MIGHT,
          effect: 'bleeding (save ends)',
        }
      },
      t2: {
        damage: {
          baseValue: 7,
          includedKitValue: 2,
          characteristicBonusOptions: [characteristic.REASON, characteristic.INTUITION, characteristic.PRESENCE],
        },
        baseEffect: 'damage; bleeding (EoT), or',
        potency: {
          strength: potency_strength.AVERAGE,
          characteristic: characteristic.MIGHT,
          effect: 'bleeding (save ends)',
        },
      },
      t3: {
        damage: {
          baseValue: 10,
          includedKitValue: 2,
          characteristicBonusOptions: [characteristic.REASON, characteristic.INTUITION, characteristic.PRESENCE],
        },
        baseEffect: 'damage; bleeding (EoT), or',
        potency: {
          strength: potency_strength.STRONG,
          characteristic: characteristic.MIGHT,
          effect: 'bleeding (save ends)',
        },
      },
    },
    {
      isEffect: true,
      title: 'Effect',
      body: `The ability also has an effect!
It's got a lot of silly text and takes up a lot of space.`,
    },
  ],
  cost: {
    costValue: "5",
    costName: "HR",
  },
  fontSizePtOverrides: {
    body: 9,
  }
};

export default function CardSettingsMenu(){

  return (
    <>
      <div className="w-[400pt] flex flex-col justify-start p-4 pt-2 pb-8 pr-2 h-full">
        <SectionSeparator name="Theme"/>
        <div className="w-full pr-2 flex flex-col items-center">
          <ThemeMenu/>
          <ThemeBasedCard c={dummyCard} id={'examplecard'} hd={undefined} enlargedState={-1}/>
        </div>
        <div className={`w-full flex-grow flex flex-col items-center overflow-y-scroll scrollbar`}>
          <CardStyleSelector/>
          <BaseColourMenu/>
          <CardTypesColourMenu/>
          <CardStyleVariantSelector/>
        </div>
      </div>
    </>
  )
}
