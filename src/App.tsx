import { useState } from 'react'
import './App.css'
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "./types/ability-card-types.ts";
import EditableAbilityCardRoot from "./components/editable-ability-card-root/editable-ability-card-root.tsx";
import dsAbilityCardsTitle from '/dsAbilityCardsTitle.png';

function App() {
  const dummyCard: ability_card = {
      type: 'Action',
      topMatter: 'Custom Heroic Action',
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
                  damageValue: '2',
                  hasGeneralEffect: true,
                  generalEffect: 'Damage',
                  hasPotency: false,
              },
              t2: {
                  hasDamage: true,
                  damageValue: '5',
                  hasGeneralEffect: true,
                  generalEffect: 'Damage',
                  hasPotency: false,
              },
              t3: {
                  hasDamage: true,
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
          costValue: '1',
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

  function deleteCard(index: number) {
      const tempCardList = [...cardsList]
      tempCardList.splice(index, 1)
      setCardsList(tempCardList);
      setSelectedCard(-1)
  }

  function updateCard(index: number, card: ability_card) {
      const tempCardList = [...cardsList]
      tempCardList.splice(index, 1, card)
      setCardsList(tempCardList);
  }

  return (
    <div className={"flex flex-col h-screen"}>
        <div className={`flex w-screen h-[60pt] p-[10pt]`}>
            <div className={`flex basis-1/2 justify-start`}>
                <div>
                    <img src={dsAbilityCardsTitle} className={`h-full`}/>
                </div>
            </div>
            <div className={`flex basis-1/2 justify-end`}>
                <div role="button" onClick={() => {
                    setSelectedCard(-1)
                    setCardsList([...cardsList, dummyCard])
                }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Action`]} justify-center items-center`}>
                    <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Action`]}`}>New Custom Card</div>
                </div>
            </div>
        </div>
        <div className={"flex-auto flex flex-wrap flex-row w-screen bg-zinc-500 items-center justify-center center"}>
            {cardsList.map((value, index) => <EditableAbilityCardRoot card={value} cardNum={index} selectedCard={selectedCard} setSelectedCard={setSelectedCard} deleteCard={deleteCard} updateCard={updateCard} />)}
        </div>
        <div className={`flex h-[18pt] justify-center`}>
            <div className={`h-full`}>
                <img src={`https://images.squarespace-cdn.com/content/v1/59b345e82994caee6bd4c397/9da38f21-7174-4e29-967b-22e55e37d98e/Powered+By+Draw+Steel.png`} className={`h-full`}/>
            </div>
            <div className={`text-center italic`}>Draw Steel Ability Cards is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.</div>
        </div>
    </div>
  )
}

export default App
