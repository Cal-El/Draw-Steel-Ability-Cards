import { useState } from 'react'
import './App.css'
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "./types/ability-card-types.ts";
import EditableAbilityCardRoot from "./components/editable-ability-card-root/editable-ability-card-root.tsx";
import dsAbilityCardsHowTo from '/DSAbilityCardsHowTo.png';
import poweredByDrawSteel from '/PoweredByDrawSteel.webp';
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
  const [howToModal, setHowToModal] = useState(false)

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
        {howToModal &&
        <button onClick={() => setHowToModal(false)} className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-7xl">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <img src={dsAbilityCardsHowTo} className="w-full"/>
                    </div>
                </div>
            </div>
        </button>
        }
        <nav className={`flex h-[60pt] p-[10pt] gap-[10pt] items-center`}>
            <img src={dsAbilityCardsTitle} className={`max-h-full h-1/3 lg:h-full`}/>
            <button onClick={() => setHowToModal(true)} className={`p-2 rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Triggered Action`]}`}>
                <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Triggered Action`]}`}>About</div>
            </button>
            <div className={`grow flex justify-end`}>
                <Select
                    value={newCardChoice}
                    onChange={chooseCard}
                    options={cardManifest}
                    className={`grow max-w-7xl`}
                />
            </div>
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
        </nav>
        <main className={"flex-auto flex flex-wrap flex-row w-screen bg-zinc-500 items-center justify-center center"}>
            {cardsList.map((value, index) => <EditableAbilityCardRoot card={value} cardNum={index} selectedCard={selectedCard} setSelectedCard={setSelectedCard} deleteCard={deleteCard} updateCard={updateCard} />)}
        </main>
        <footer className={`flex justify-center max-h-[18pt] items-center p-4 gap-5`}>
            <img className={`w-32`} src={poweredByDrawSteel}/>
            <div className={`text-center text-xs`}>Draw Steel Ability Cards is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.</div>
        </footer>
    </div>
  )
}

export default App
