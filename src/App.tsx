import {DragEvent, useState} from 'react'
import './App.css'
import {ability_card, actionTextColorStyle, getDynamicColorBase} from "./types/ability-card-types.ts";
import {ability_card as new_ability_card, characteristic, potency_strength} from "./types/ability-card.ts";
import EditableAbilityCardRoot from "./components/editable-ability-card-root/editable-ability-card-root.tsx";
import dsAbilityCardsTitle from '/dsAbilityCardsTitle.png';
import dsAbilityCardsHowTo from '/DSAbilityCardsHowTo.png';
import poweredByDrawSteel from '/PoweredByDrawSteel.webp';
import Select from "react-select";
import {cardManifest} from "./types/generated/card-manifest.ts";
import {parse as yamlParse} from "yaml";
import {
  DisplayedCardListKey,
  getCardList,
  saveCardList
} from './components/data-saving/saving-service.ts';
import Sidebar from './components/sidebar/sidebar.tsx';
import {asNewCard, Card, CardList, getCardTitle, isNewCard, nonNullHeroData} from "./types/card-list.ts";
import HeroDataMenu from "./components/hero-data-menu.tsx";
import {getMetadata} from "meta-png";
import {toast} from "react-toastify";
import EditSidebarModal from "./components/edit-card-sidebar/edit-sidebar-modal.tsx";
import {buildEmptyHeroData} from "./types/character-data.ts";
import {UpgradeCard} from "./utils/ability-card-upgrader.ts";

function App() {
  let dummyCard: ability_card = {
    type: `Action`,
    topMatter: `Custom Ability`,
    title: `Blank Card`,
    flavour: `You could do anything...`,
    keywords: [],
    statements: [],
    hasCost: false,
    target: `None`,
    distance: [],
  } satisfies ability_card;

  let dummyCard2: new_ability_card = {
    version: 2,
    level: 1,
    type: "Main action",
    header: {
      topMatter: "Level 1 Custom Ability",
      title: "Blank Card Version 2",
      flavour: "Careful you don't break anything..",
      keywords: ["Fire", "Magic", "Melee", "Ranged", "Strike", "Weapon"],
      distance: {
        display: "Melee [1] or Ranged [5]",
        values: [
          {type: "Melee", baseValue: 1, includedKitValue: 0},
          {type: "Ranged", baseValue: 5, includedKitValue: 0}
        ]
      },
      target: "Two creatures"
    },
    body: [
      {
        isPowerRoll: true,
        characteristicBonus: [characteristic.MIGHT, characteristic.AGILITY],
        t1: {
          damage: {
            baseValue: 4,
            includedKitValue: 2,
            characteristicBonusOptions: [characteristic.MIGHT, characteristic.AGILITY],
            otherBonus: ""
          },
          baseEffect: "holy damage; and kill god",
          potency: {
            characteristic: characteristic.PRESENCE,
            strength: potency_strength.WEAK,
            effect: "this is a potency effect"
          }
        },
        t2: {
          damage: {
            baseValue: 7,
            includedKitValue: 2,
            characteristicBonusOptions: [characteristic.MIGHT, characteristic.AGILITY],
            otherBonus: ""
          },
          baseEffect: "holy damage; and kill god",
          potency: {
            characteristic: characteristic.PRESENCE,
            strength: potency_strength.AVERAGE,
            effect: "this is a potency effect"
          }
        },
        t3: {
          damage: {
            baseValue: 10,
            includedKitValue: 2,
            characteristicBonusOptions: [characteristic.MIGHT, characteristic.AGILITY],
            otherBonus: ""
          },
          baseEffect: "holy damage; and kill god",
          potency: {
            characteristic: characteristic.PRESENCE,
            strength: potency_strength.STRONG,
            effect: "this is a potency effect"
          }
        }
      },
      {
        isEffect: true,
        title: `Please Note`,
        body: `You can brick the site if you mess with this. You can fix it by heading into your Local Storage and removing the displayed cardlist.`
      }
    ],
    cost: {
      costName: "Focus",
      costValue: "3"
    },
    fontSizePtOverrides: {}
  };

  const cList : CardList = getCardList(DisplayedCardListKey)

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
      let cccs: new_ability_card[] = []
      await fetch(baseUrl + "/newcards/card-manifest.json")
          .then(r => r.text())
          .then(async text => {
              const allCardz = JSON.parse(text);
              for (const cadd of allCardz) {
                  await fetch(baseUrl + cadd)
                      .then(r => r.text())
                      .then(textt => {
                          const parsedCard = yamlParse(textt) as ability_card;
                          if (isNewCard(parsedCard)) {
                            cccs = [...cccs, asNewCard(parsedCard)]
                          } else {
                            cccs = [...cccs, UpgradeCard(parsedCard)]
                          }});
              }
          });
      setSelectedCard(-1);
      updateCardList({abilityCards: cccs, heroData: buildEmptyHeroData()});
  }

  function deleteCard(index: number) {
      const tempCardList = [...cardsList.abilityCards]
      tempCardList.splice(index, 1)
      updateCardList({...cardsList, abilityCards: tempCardList});
      setSelectedCard(-1)
  }

  function updateCard(index: number, card: Card) {
      const tempCardList = [...cardsList.abilityCards]
      tempCardList.splice(index, 1, card)
      updateCardList({...cardsList, abilityCards: tempCardList});
  }

  function updateCardList(newList: CardList) {
    setCardsList(newList);
    saveCardList(DisplayedCardListKey, newList)
  }

  async function dropUpload(e : DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const promises : Promise<Card | undefined>[] = [];

    const addCardDataFromPngFileMetadata = async function (file : File | undefined | null) {
      if (!file) {
        return;
      } else if (file.type !== "image/png") {
        toast.error(`Cannot import ${file.name}: File is not a png`);
        return;
      }
      const r = await file.stream().getReader().read();
      if (!r.value) {
        toast.error(`Failed to read ${file.name}`);
        return;
      }
      const metaCarddataURI = getMetadata(r.value, "cardData");
      if (!metaCarddataURI) {
        toast.error(`${file.name} is missing embedded card metadata`);
        return;
      }
      const metaCarddata = decodeURI(metaCarddataURI);
      return yamlParse(metaCarddata) as Card;
    }

    if (e.dataTransfer?.items) {
      for (let item of [...e.dataTransfer.items]) {
        if (item.kind === "file") {
          promises.push(addCardDataFromPngFileMetadata(item.getAsFile()));
        }
      }
    } else if (e.dataTransfer?.files) {
      for (let file of [...e.dataTransfer.files]) {
        promises.push(addCardDataFromPngFileMetadata(file));
      }
    }
    Promise.all(promises).then(cards => {
      const newCards = cards.filter(c => c !== undefined);
      setSelectedCard(-1);
      updateCardList({...cardsList, abilityCards: [...cardsList.abilityCards].concat(...newCards)});
      newCards.forEach((c) => toast.success(`Added new card: ${getCardTitle(c)}`))
    })
  }

  const includeAllCardsButton = false;

  return (
    <div className={`flex flex-col h-screen ${selectedCard > -1 ? 'overflow-hidden': 'overflow-y-scroll'} print:overflow-visible`}>
        <EditSidebarModal callback={(c: Card | undefined) => {
          if (c) updateCard(selectedCard, c)
          setSelectedCard(-1)
        }} deleteCallback={() => {
          deleteCard(selectedCard)
        }} card={selectedCard < 0 ? undefined : {...cardsList.abilityCards[selectedCard]}} heroStats={cardsList.heroData}/>
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
            <button onClick={() => setHowToModal(true)} className={`h-full w-[120pt] rounded-[13.5pt] border-[3pt] bg-cardback`}
              style={{borderColor: getDynamicColorBase(`Triggered Action`)}}>
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
                    updateCardList({...cardsList, abilityCards: [...cardsList.abilityCards, parsedCard]});
                }
            }} disabled={cardChoiceLoading} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
              style={{borderColor: getDynamicColorBase(`Maneuver`)}}>
                <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Maneuver`]}`}>Add Card</div>
            </button>
            {includeAllCardsButton &&
                <button onClick={() => {
                    allCards()
                }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
                style={{borderColor: getDynamicColorBase(`Maneuver`)}}>
                    <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Maneuver`]}`}>Add All Cards</div>
                </button>
            }
            <button onClick={(e) => {
              if (e.shiftKey && e.altKey && e.ctrlKey) {
                allCards();
              } else {
                setSelectedCard(-1)
                updateCardList({
                  ...cardsList,
                  abilityCards: [...cardsList.abilityCards, e.shiftKey ? dummyCard2 : dummyCard]
                })
              }
            }} className={`flex h-full w-[120pt] rounded-[13.5pt] border-[3pt] bg-cardback justify-center items-center`}
              style={{borderColor: getDynamicColorBase(`Action`)}}>
                <div className={`text-[16pt] text-center font-bold font-body small-caps leading-none ${actionTextColorStyle[`Action`]}`}>Add New Blank Card</div>
            </button>
        </nav>
        <div className='flex flex-auto w-full print:m-0 print:p-0'>
            <div className='flex flex-row w-full'>
              <div className={`${sidebarOpen ? 'w-1/4' : 'w-14'} bg-zinc-300 print:hidden`}>
                <Sidebar open={sidebarOpen} toggleOpen={() => setSidebarOpen(!sidebarOpen)} displayedCards={cardsList} setDisplayedCards={setCardsList}/>
              </div>
              <main onDrop={dropUpload} onDragOver={(event) => event.preventDefault()} className={"w-screen bg-zinc-500 print:bg-white"}>
                <HeroDataMenu displayedCards={cardsList} setDisplayedCards={setCardsList}/>
                <div className={`flex-auto flex flex-wrap flex-row items-center justify-center print:gap-[1pt] print:items-start print:justify-start`}>
                  {cardsList.abilityCards.map((value, index) => <EditableAbilityCardRoot key={index} card={value} heroData={nonNullHeroData(cardsList)} cardNum={index} selectedCard={selectedCard} setSelectedCard={setSelectedCard} deleteCard={deleteCard} updateCard={updateCard} />)}
                </div>
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
