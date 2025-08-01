import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {RiDeleteBin6Fill, RiMenuFold4Line, RiMenuUnfold4Line} from "react-icons/ri";
import {
  cardListHasUnsavedChanges,
  changeActiveCardList,
  deleteCardList,
  DisplayedCardListKey,
  getActiveCardList,
  getCardList,
  getCardListNames,
  hasUnsavedChanges,
  saveCardList
} from "../data-saving/saving-service";
import {HiPlus, HiTrash} from "react-icons/hi";
import {FaSave} from "react-icons/fa";
import ConfirmModal from "./confirm-modal";
import {TbFileExport, TbFileImport} from "react-icons/tb";
import FileSaver from "file-saver";
import {useFilePicker} from "use-file-picker";
import {SelectedFiles} from "use-file-picker/types";
import {useHotkeys} from "react-hotkeys-hook";
import {toast, ToastContainer} from "react-toastify";
import {CardList} from "../../types/card-list.ts";
import {DamageBonus, DistanceBonus, HeroData} from "../../types/character-data.ts";
import {characteristic} from "../../types/ability-card.ts";

export default function Sidebar({open, toggleOpen, displayedCards, setDisplayedCards}: 
  {open: boolean, toggleOpen: () => void, displayedCards: CardList, setDisplayedCards: Dispatch<SetStateAction<CardList>>}){
  const [cardListNames, setCardListNames] = useState<string[]>(getCardListNames() || [])
  const [activeCardList, setActiveCardList] = useState<string>(getActiveCardList())
  const [isUnsavedChanges, setIsUnsavedChanges] = useState<boolean>(hasUnsavedChanges())

  const [creatingNewList, setCreatingNewList] = useState(false)
  const [newCardListName, setNewCardListName] = useState("")
  const [saveDisplayedCards, setSaveDisplayedCards] = useState(true)
  const [saveCurrentError, setSaveCurrentError] = useState("")

  const [confirmModalText, setConfirmModalText] = useState("")
  const [confirmModalFunc, setConfirmModalFunc] = useState<() => void>(() => () => {})
  const [confirmModalIcon, setConfirmModalIcon] = useState("")

  useEffect(() => {
    setIsUnsavedChanges(cardListHasUnsavedChanges(displayedCards))
  }, [displayedCards])

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    multiple: false,
    onFilesSuccessfullySelected: (({filesContent}: SelectedFiles<string>) => {
      filesContent.map((file) => {
        setDisplayedCards(JSON.parse(file.content ?? ''))
        updateActiveCardList("")
      })
    })
  })

  useHotkeys('ctrl+s', () => saveActiveCardList(), {preventDefault: true})

  const updateActiveCardList = (cardListName: string) => {
    setActiveCardList(cardListName)
    changeActiveCardList(cardListName)
  }

  const newCardList = () => {
    if (!newCardListName){
      setSaveCurrentError("Card List Name is required")
    } else if (newCardListName === DisplayedCardListKey || cardListNames.includes(newCardListName)) {
      setSaveCurrentError("Card List Name is already in use. Please pick another")
    } else {
      const cardListToSave = saveDisplayedCards ? displayedCards : { abilityCards: [], heroData: new HeroData({}) }
      setSaveCurrentError("")
      saveCardList(newCardListName, cardListToSave)
      if (saveDisplayedCards) {
        updateActiveCardList(newCardListName)
        setIsUnsavedChanges(false)
      }
      setCardListNames(cardListNames.concat(newCardListName))
      setNewCardListName("")
      setCreatingNewList(false)
      setSaveDisplayedCards(true)
    }
  }

  const saveActiveCardList = () => {
    if (activeCardList.length > 0) {
      saveCardList(activeCardList, displayedCards)
      setIsUnsavedChanges(false)
      toast.success('Changes saved to ' + activeCardList)
    }
  }

  const updateDisplayedCards = (newCards: CardList) => {
    saveCardList(DisplayedCardListKey, newCards)
    setDisplayedCards(newCards)
  }

  const openLoadModal = (cardListName: string) => {
    if(isUnsavedChanges && !(activeCardList === "" && displayedCards.abilityCards.length === 0)){
      const text = "You have unsaved changes that will be overwritten by loading " + cardListName + ". Are you sure you want to proceed?"
      openModal(text, () => {
        updateDisplayedCards(getCardList(cardListName))
        updateActiveCardList(cardListName)
        closeModal()
      }, "load")
    } else {
      updateDisplayedCards(getCardList(cardListName))
      updateActiveCardList(cardListName)
    }
  }

  const openClearCurrentModal = () => {
    if (displayedCards.abilityCards.length > 0) {
      const text = "Are you sure you want to clear the current card list? Any unsaved displayed cards will be lost. This action cannot be reversed."
      openModal(text, () => {
        updateDisplayedCards({abilityCards: [], heroData: new HeroData({})})
        updateActiveCardList("")
        closeModal()
      }, "load")
    } else {
      updateActiveCardList("")
    }
  }

  const openDeleteModal = (cardListName: string) => {
    const text = "Are you sure you want to delete " + cardListName + "? This action cannot be reversed."
    openModal(text, () => {
      deleteCardList(cardListName)
      setCardListNames(getCardListNames() || [])
      if (activeCardList === cardListName) {
        updateActiveCardList("")
      }
      toast.success("Successfully deleted " + cardListName)
      closeModal()
    }, "delete")
  }

  const openModal = (text: string, modalFunc: () => void, icon: string) => {
    setConfirmModalText(text)
    setConfirmModalFunc(() => modalFunc)
    setConfirmModalIcon(icon)
  }

  const closeModal = () => {
    setConfirmModalFunc(() => {})
    setConfirmModalText("")
  }

  const onUpdateCharacteristic = (e : ChangeEvent<HTMLInputElement>, c : characteristic) => {
    const val = e.currentTarget.value && e.currentTarget.value.length > 0 ? parseInt(e.currentTarget.value) : undefined;
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.characteristics.set(c, val);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onUpdateBonus = (db : Bonus, i: number) => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus.splice(i, 1, db);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onAddDistanceBonus = () => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus = [...hd.bonus, new DistanceBonus({keywordMatcher: [], type:"", distanceType: "", value: 0})];
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onAddDamageBonus = () => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus = [...hd.bonus, new DamageBonus({keywordMatcher: [], type:"", rolledDamageBonus: 0})];
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const exportCardList = () => {
    const exportName = activeCardList ?? "UnnamedCardList"
    const cardData = getCardList(DisplayedCardListKey)
    const blob = new Blob([JSON.stringify(cardData)], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, exportName + ".json")
  }

  const importCardList = () => {
    if (isUnsavedChanges && !(activeCardList === "" && displayedCards.abilityCards.length === 0)) {
      openModal("You have unsaved changes that will be overwritten by importing cards. Are you sure you want to import?", () => {
        openFilePicker()
        closeModal()
      },"save")
    } else {
      openFilePicker()
    }
  }

  return (
    <>
    <button className="text-3xl m-3 float-right hover:text-gray-700" onClick={toggleOpen}>
      { open ? 
        <RiMenuFold4Line/>
        : <RiMenuUnfold4Line/>
      }
    </button>
    {open &&
      <div className={`m-3 space-y-2`}>
        <h1 className="text-xl font-body font-semibold small-caps">Card Lists</h1>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button disabled={displayedCards.abilityCards.length === 0 && activeCardList.length === 0} onClick={() => openClearCurrentModal()} className={`flex flex-row font-body text-lg text-center items-center ${displayedCards.abilityCards.length === 0 && activeCardList.length === 0 ? 'text-gray-400' : 'hover:text-gray-700'} small w-full`}>
            <HiTrash/>&nbsp;Clear All Displayed Cards
          </button>
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button onClick={() => setCreatingNewList(!creatingNewList)} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small w-full">
            <HiPlus/>&nbsp;Create New Card List
          </button>
          {creatingNewList &&
            <>
              <div className={`flex items-center gap-3`}>
                  <div className={'font-body text-right'}>Card List Name:</div>
                  <input type='text' className={`block p-2 text-sm border-zinc-300 border-2 text-gray-900 bg-white rounded-lg font-mono flex-auto`}
                    value={newCardListName} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCardListName(e.target.value)}/>
              </div>
              <div className={`py-2`}>
                  <label className="cursor-pointer">
                    <input type='checkbox'
                      checked={saveDisplayedCards} onChange={() => setSaveDisplayedCards(!saveDisplayedCards)}/>
                    &nbsp;Save currently displayed cards to new list?
                  </label>
              </div>
              {saveCurrentError &&
                <div className="py-2">
                  <div className="p-3 text-sm text-red-900 rounded-lg bg-red-100" role="alert">
                    <span className="font-medium">Error!</span> {saveCurrentError}
                  </div>
                </div>
              }
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => setCreatingNewList(false)}
                  className={`p-2 rounded-xl bg-[#323842] hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Cancel
                </button>
                <button onClick={newCardList} className={`p-2 rounded-xl bg-action-card hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Save Card List
                </button>
              </div>
            </>
          }
        </div>
        <div className="bg-zinc-200 rounded-lg p-2 pl-2 pr-2 divide-y divide-zinc-400">
          {cardListNames.map(list => {
            return <>
              <div className={`px-2 rounded-md cursor-pointer ${activeCardList === list ? 'bg-blue-200' : 'hover:bg-zinc-300'}`} key={list}>
                <div className={`flex flex-row justify-between items-center`}>
                  <p className={`line-clamp-1 overflow-hidden flex-1 py-2`} onClick={() => openLoadModal(list)}>{list}{activeCardList === list && isUnsavedChanges && '*'}</p>
                  {activeCardList === list && <button disabled={!isUnsavedChanges} onClick={() => saveActiveCardList()} className={`flex flex-row font-body text-center items-center ${!isUnsavedChanges ? 'text-zinc-400' : 'hover:text-gray-700'} small`}>
                    <FaSave/>&nbsp;
                  </button>}
                  <span className="flex flex-row space-x-3 py-2">
                    <button onClick={() => openDeleteModal(list)}><span className="flex flex-row items-center hover:text-gray-700"><RiDeleteBin6Fill/><span className={`hidden 2xl:block`}>&nbsp;</span></span></button>
                  </span>
                </div>
                {activeCardList === list && <>
                  <div className={`grid grid-cols-5 auto-rows-min p-1 gap-1 text-center items-center justify-center bg-stone-200`}>
                    <p>M</p>
                    <p>A</p>
                    <p>R</p>
                    <p>I</p>
                    <p>P</p>
                    <input className={`text-center`} value={displayedCards.heroData?.characteristics.get(characteristic.MIGHT) ?? ""} type='number' onChange={(event) => onUpdateCharacteristic(event, characteristic.MIGHT)}></input>
                    <input className={`text-center`} value={displayedCards.heroData?.characteristics.get(characteristic.AGILITY) ?? ""} type='number' onChange={(event) => onUpdateCharacteristic(event, characteristic.AGILITY)}></input>
                    <input className={`text-center`} value={displayedCards.heroData?.characteristics.get(characteristic.REASON) ?? ""} type='number' onChange={(event) => onUpdateCharacteristic(event, characteristic.REASON)}></input>
                    <input className={`text-center`} value={displayedCards.heroData?.characteristics.get(characteristic.INTUITION) ?? ""} type='number' onChange={(event) => onUpdateCharacteristic(event, characteristic.INTUITION)}></input>
                    <input className={`text-center`} value={displayedCards.heroData?.characteristics.get(characteristic.PRESENCE) ?? ""} type='number' onChange={(event) => onUpdateCharacteristic(event, characteristic.PRESENCE)}></input>
                  </div>
                  {displayedCards.heroData?.bonus.map((b, i) => {
                    if (b instanceof DistanceBonus) {
                      const db = b as DistanceBonus;
                      return (
                        <div key={i} className={`p-2 bg-stone-200`}>
                          <div className={`font-bold`}>Distance Bonus</div>
                          <div className={`grid auto-rows-min grid-cols-2 gap-1 justify-between items-center`}>
                            <div className={`col-span-1`}>Type: </div><input className={`col-span-2`} value={db.type} onChange={(e) => {
                              const ndb = new DistanceBonus({...db, type: e.target.value ?? ""});
                              onUpdateBonus(ndb, i);
                            }}></input>
                            <div className={`col-span-3`}>
                              <div>Keyword Matcher:</div>
                              <input value={db.keywordMatcher.join(", ")} onChange={(e) => {
                                const ndb = new DistanceBonus({...db, keywordMatcher: (e.target.value ?? '').split(', ')});
                                onUpdateBonus(ndb, i);
                              }}></input>
                            </div>
                            <div className={`col-span-1`}>Distance Type: </div><input className={`col-span-2`} value={db.distanceType} onChange={(e) => {
                              const ndb = new DistanceBonus({...db, distanceType: e.target.value ?? ''});
                              onUpdateBonus(ndb, i);
                            }}></input>
                            <div className={`col-span-1`}>Value: </div><input type={`number`} className={`col-span-2`} value={db.value ?? ''} onChange={(e) => {
                              const ndb = new DistanceBonus({...db, value: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                              onUpdateBonus(ndb, i);
                            }}></input>
                          </div>
                        </div>
                      )
                    } else if (b instanceof DamageBonus) {
                      const db = b as DamageBonus;
                      return (
                        <div key={i} className={`p-2 bg-stone-200`}>
                          <div className={`font-bold`}>Damage Bonus</div>
                          <div className={`grid auto-rows-min grid-cols-3 gap-1 justify-between items-center`}>
                            <div className={`col-span-1`}>Type: </div><input className={`col-span-2`} value={db.type} onChange={(e) => {
                              const ndb = new DamageBonus({...db, type: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                              onUpdateBonus(ndb, i);
                            }}></input>
                            <div className={`col-span-3`}>
                              <div>Keyword Matcher:</div>
                              <input value={db.keywordMatcher.join(", ")} onChange={(e) => {
                                const ndb = new DamageBonus({...db, keywordMatcher: (e.target.value ?? '').split(', ')});
                                onUpdateBonus(ndb, i);
                              }}></input>
                            </div>
                            {db.isFlatBonus() ?
                              <><div className={`col-span-1`}>Flat bonus: </div><input type={`number`} className={`col-span-2`} value={db.rolledDamageBonus as number} onChange={(e) => {
                                const ndb = new DamageBonus({...db, rolledDamageBonus: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                                onUpdateBonus(ndb, i);
                              }}></input></> :
                              <>
                                <div className={`col-span-1`}/><div className={`col-span-1`}>Tier 1: </div><input type={`number`} className={`col-span-1`} value={(db.rolledDamageBonus as {t1: number}).t1} onChange={(e) => {
                                  const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t2: db.getBonusForTier(2), t3: db.getBonusForTier(3)}});
                                  onUpdateBonus(ndb, i);
                                }}></input>
                                <div className={`col-span-1`}/><div className={`col-span-1`}>Tier 2: </div><input type={`number`} className={`col-span-1`} value={(db.rolledDamageBonus as {t2: number}).t2} onChange={(e) => {
                                  const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t3: db.getBonusForTier(3)}});
                                  onUpdateBonus(ndb, i);
                                }}></input>
                                <div className={`col-span-1`}/><div className={`col-span-1`}>Tier 3: </div><input type={`number`} className={`col-span-1`} value={(db.rolledDamageBonus as {t3: number}).t3} onChange={(e) => {
                                  const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: db.getBonusForTier(2), t3: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0}});
                                  onUpdateBonus(ndb, i);
                                }}></input>
                              </>
                            }
                            <button className={`col-span-full`} onClick={() => {
                              const ndb = new DamageBonus({...db, rolledDamageBonus: db.isFlatBonus() ? {t1: 1, t2: 1, t3: 1} : 1});
                              onUpdateBonus(ndb, i);
                            }}>{db.isFlatBonus() ? 'Switch to Tier Damage' : 'Switch to Flat Damage'}</button>
                          </div>
                        </div>
                      )
                    }
                    return;
                  })}
                  <div className={`flex flex-row justify-between items-center`}>
                    <button onClick={() => onAddDistanceBonus()}>Add Distance Bonus</button>
                    <button onClick={() => onAddDamageBonus()}>Add Damage Bonus</button>
                  </div>
                </>}
              </div>
            </>
          })}
          {activeCardList.length === 0 && displayedCards.abilityCards.length > 0 &&
            <div className={`flex flex-row justify-between items-center rounded-md p-2`} key={'unsaved list'}>
              <p className={`line-clamp-1 overflow-hidden flex-1 text-center bg-stone-300 border border-2 border-stone-400 border-dashed`}>Unsaved Current Workspace</p>
            </div>
          }
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button disabled={activeCardList.length===0} onClick={() => exportCardList()} className={`flex flex-row font-body text-lg text-center items-center ${activeCardList.length===0 ? 'text-gray-400' : 'hover:text-gray-700'} small w-full`}>
            <TbFileExport/>&nbsp;Export Selected Card List
          </button>
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button onClick={importCardList} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small w-full">
            <TbFileImport/>&nbsp;Import Card List
          </button>
        </div>
        
      </div>
    }
    {confirmModalText !== "" && 
      <ConfirmModal text={confirmModalText} onSubmit={confirmModalFunc} onCancel={closeModal} icon={confirmModalIcon}/>
    }
    <ToastContainer position="bottom-right"/>
    </>
  )
}
