import { useState } from 'react'
import './App.css'
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "./types/ability-card-types.ts";
import EditableAbilityCardRoot from "./components/editable-ability-card-root/editable-ability-card-root.tsx";
import dsAbilityCardsTitle from '/dsAbilityCardsTitle.png';
import Select from "react-select";
import {cardManifest} from "./types/generated/card-manifest.ts";
import {parse as yamlParse} from "yaml";
import { ActiveCardListKey, getCardList, saveCardList } from './components/data-saving/saving-service.ts';

function App() {
  const dummyCard: ability_card = {
      type: 'Action',
      topMatter: 'Custom Ability',
      title: 'Blank Card',
      keywords: [],
      flavour: '',
      statements: [],
      hasCost: false,
      target: 'Self',
      distance: [],
  };

  const cList : ability_card[] = getCardList(ActiveCardListKey)

  const [selectedCard, setSelectedCard] = useState(-1)
  const [cardsList, setCardsList] = useState(cList)
  const [newCardChoice, setNewCardChoice] = useState<{value: string; label: string;} | null>(null)
  const [cardChoiceText, setCardChoiceText] = useState<string | null>(null)
  const [cardChoiceLoading, setCardChoiceLoading] = useState(true)

  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  function chooseCard(manifestEntry: {value: string; label: string;} | null) {
      setCardChoiceLoading(true);
      setNewCardChoice(manifestEntry);
      if (manifestEntry) {
          fetch(baseUrl + manifestEntry?.value)
              .then(r => r.text())
              .then(text => {
                  setCardChoiceText(text)
                  setCardChoiceLoading(false);
              });
      }
  }

  function deleteCard(index: number) {
      const tempCardList = [...cardsList]
      tempCardList.splice(index, 1)
      updateCardList(tempCardList);
      setSelectedCard(-1)
  }

  function updateCard(index: number, card: ability_card) {
      const tempCardList = [...cardsList]
      tempCardList.splice(index, 1, card)
      updateCardList(tempCardList);
  }

  function updateCardList(newList: ability_card[]) {
    setCardsList(newList)
    saveCardList(ActiveCardListKey, newList)
  }

  return (
    <div className={"flex flex-col h-screen"}>
        <div className={`flex w-screen h-[60pt] p-[10pt]`}>
            <div className={`flex basis-1/2 justify-start`}>
                <div>
                    <img src={dsAbilityCardsTitle} className={`h-full`}/>
                </div>
            </div>
            <div className={`flex basis-1/2 justify-end items-center gap-[5pt]`}>
                <Select
                    value={newCardChoice}
                    onChange={chooseCard}
                    options={cardManifest}
                    className={`flex-auto`}
                />
                <button onClick={() => {
                    if (cardChoiceText) {
                        const parsedCard = yamlParse(cardChoiceText) as ability_card;
                        setSelectedCard(-1);
                        updateCardList([...cardsList, parsedCard]);
                    }
                }} disabled={cardChoiceLoading} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Maneuver`]} justify-center items-center`}>
                    <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Maneuver`]}`}>Add Card</div>
                </button>
                <button onClick={() => {
                    setSelectedCard(-1)
                    updateCardList([...cardsList, dummyCard])
                }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Action`]} justify-center items-center`}>
                    <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Action`]}`}>Add New Blank Card</div>
                </button>
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
