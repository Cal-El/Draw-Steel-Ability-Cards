import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
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
import {HeroData} from "../../types/character-data.ts";

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
