import { useState } from 'react'
import './App.css'
import AbilityCard from "./components/ability-card/ability-card.tsx";
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "./components/ability-card/ability-card-types.ts";

function App() {
  const dummyCard: ability_card = {
      type: 'Action',
      source: 'Custom Heroic',
      title: 'My Cool Ability',
      keywords: [
          'Attack',
          'Magic',
          'Ranged',
          'Weapon',
      ],
      flavour: 'Holy magic zap!',
      statements: [
          {
              characteristic: 'Any Characteristic',
              t1: {
                  hasDamage: true,
                  damageType: 'Damage',
                  damageValue: '2',
                  hasGeneralEffect: true,
                  generalEffect: 'Damage',
                  hasPotency: false,
              },
              t2: {
                  hasDamage: true,
                  damageType: 'Damage',
                  damageValue: '5',
                  hasGeneralEffect: true,
                  generalEffect: 'Damage',
                  hasPotency: false,
              },
              t3: {
                  hasDamage: true,
                  damageType: 'Damage',
                  damageValue: '6',
                  hasGeneralEffect: true,
                  generalEffect: 'Damage',
                  hasPotency: false,
              },
          },
          {
              key: 'Effect',
              value: 'Some effect.'
          },
          {
              key: 'Spend HR',
              value: 'Do something cool for each HR spent.'
          },
      ],
      hasCost: true,
      cost: {
          costName: 'HR',
          costValue: 1,
      },
      target: '1 Creature or Object',
      distance: [
          {
              distanceHeader: 'Melee',
              distanceValue: '1',
          },
      ],
  };

  const cList : ability_card[] = []

  const [selectedCard, setSelectedCard] = useState(-1)
  const [cardsList, setCardsList] = useState(cList)

  return (
    <div className={"flex flex-col h-screen"}>
        <div className={`flex w-screen justify-end p-[10pt]`}>
            <div role="button" onClick={() => {
                setSelectedCard(cardsList.length + 1)
                setCardsList([...cardsList, dummyCard])
            }} className={`flex h-[60pt] w-[120pt] rounded-[13.5pt] border border-[3pt] ${cardbackColorStyle[`Action`]} justify-center items-center`}>
                <div className={`text-[16pt] text-center ${actionTextColorStyle[`Action`]}`}>New Card</div>
            </div>
        </div>
        <div className={"flex-auto flex flex-wrap flex-row w-screen bg-zinc-500 items-center justify-center center"}>
            {cardsList.map((value, index) => <AbilityCard card={value} cardNum={index + 1} selectedCard={selectedCard} setSelectedCard={setSelectedCard}  />)}
        </div>
        <div className={`text-center italic`}>Draw Steel Ability Cards is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.</div>
    </div>
  )
}

export default App
