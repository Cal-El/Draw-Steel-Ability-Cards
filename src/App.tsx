import { useState } from 'react'
import './App.css'
import {ability_card, actionTextColorStyle, cardbackColorStyle} from "./types/ability-card-types.ts";
import EditableAbilityCardRoot from "./components/editable-ability-card-root/editable-ability-card-root.tsx";
import dsAbilityCardsTitle from '/dsAbilityCardsTitle.png';
import dsAbilityCardsHowTo from '/DSAbilityCardsHowTo.png';
import poweredByDrawSteel from '/PoweredByDrawSteel.webp';
import Select from "react-select";
import {cardManifest} from "./types/generated/card-manifest.ts";
import {parse as yamlParse} from "yaml";
import { DisplayedCardListKey, getCardList, saveCardList } from './components/data-saving/saving-service.ts';
import Sidebar from './components/sidebar/sidebar.tsx';

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

  const cList : ability_card[] = getCardList(DisplayedCardListKey)

  const [selectedCard, setSelectedCard] = useState(-1)
  const [cardsList, setCardsList] = useState(cList)
  const [newCardChoice, setNewCardChoice] = useState<{value: string; label: string;} | null>(null)
  const [cardChoiceText, setCardChoiceText] = useState<string | null>(null)
  const [cardChoiceLoading, setCardChoiceLoading] = useState(true)
  const [howToModal, setHowToModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  async function allCards() {
      let cccs: ability_card[] = []
      await fetch(baseUrl + "/card-manifest.json")
          .then(r => r.text())
          .then(async text => {
              const allCardz = JSON.parse(text);
              for (const cadd of allCardz) {
                  await fetch(baseUrl + cadd)
                      .then(r => r.text())
                      .then(textt => {
                          const parsedCard = yamlParse(textt) as ability_card;
                          cccs = [...cccs, parsedCard]
                      });
              }
          });
      setSelectedCard(-1);
      updateCardList(cccs);
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
    saveCardList(DisplayedCardListKey, newList)
  }

  const includeAllCardsButton = false;

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
        <nav className={`flex h-[60pt] p-[10pt] gap-[10pt] items-center visible print:invisible print:h-0 print:p-0`}>
            <img src={dsAbilityCardsTitle} className={`max-h-full h-1/3 lg:h-full`}/>
            <button onClick={() => setHowToModal(true)} className={`h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Triggered Action`]}`}>
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
            {includeAllCardsButton &&
                <button onClick={() => {
                    allCards()
                }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Maneuver`]} justify-center items-center`}>
                    <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Maneuver`]}`}>Add All Cards</div>
                </button>
            }
            <button onClick={() => {
                setSelectedCard(-1)
                updateCardList([...cardsList, dummyCard])
            }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[`Action`]} justify-center items-center`}>
                <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Action`]}`}>Add New Blank Card</div>
            </button>
        </nav>
        <div className='flex flex-auto w-full print:m-0 print:p-0'>
            <div className='flex flex-row w-full'>
                <div className={`${sidebarOpen ? 'w-1/4' : 'w-14'} bg-zinc-300 print:hidden`}>
                    <Sidebar open={sidebarOpen} toggleOpen={() => setSidebarOpen(!sidebarOpen)} displayedCards={cardsList} setDisplayedCards={setCardsList}/>
                </div>
                <main className={"flex-auto flex flex-wrap flex-row w-screen bg-zinc-500 print:bg-white items-center justify-center print:gap-[1pt] print:items-start print:justify-start"}>
                    {cardsList.map((value, index) => <EditableAbilityCardRoot key={index} card={value} cardNum={index} selectedCard={selectedCard} setSelectedCard={setSelectedCard} deleteCard={deleteCard} updateCard={updateCard} />)}
                </main>
            </div>
        </div>
        <footer className={`flex justify-center max-h-[18pt] items-center p-5 gap-5 visible print:invisible print:h-0`}>
            <button onClick={()=> window.open("https://ko-fi.com/calgrier", "_blank")} className={`flex bg-[#323842] p-1 pl-3 pr-3 rounded-lg justify-center items-center gap-2`}>
                <img className={`h-4`} src="https://storage.ko-fi.com/cdn/cup-border.png"/>
                <p className={`text-white font-bold font-body small-caps`}>Support Us on Ko-fi</p>
            </button>
            <img className={`w-32`} src={poweredByDrawSteel}/>
            <div className={`text-center text-xs`}>Draw Steel Ability Cards is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC. DRAW STEEL © 2024 MCDM Productions, LLC.</div>
        </footer>
    </div>
  )
}

export default App
