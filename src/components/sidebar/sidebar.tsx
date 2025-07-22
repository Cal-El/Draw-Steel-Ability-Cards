import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { RiDeleteBin6Fill, RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { ActiveCardListKey, deleteCardList, getCardList, getCardListNames, saveCardList } from "../data-saving/saving-service";
import { HiPlus, HiTrash } from "react-icons/hi";
import { ability_card } from "../../types/ability-card-types";
import { FaSave } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import ConfirmModal from "./confirm-modal";
import { TbFileExport, TbFileImport } from "react-icons/tb";
import FileSaver from "file-saver";
import { useFilePicker } from "use-file-picker";
import { SelectedFiles } from "use-file-picker/types";

export default function Sidebar({open, toggleOpen, displayedCards, setDisplayedCards}: 
  {open: boolean, toggleOpen: () => void, displayedCards: ability_card[], setDisplayedCards: Dispatch<SetStateAction<ability_card[]>>}){
  const [cardListNames, setCardListNames] = useState<string[]>(getCardListNames() || [])
  const [savingCurrent, setSavingCurrent] = useState(false)
  const [cardListName, setCardListName] = useState("")
  const [exporting, setExporting] = useState(false)
  const [exportName, setExportName] = useState("")
  const [saveCurrentError, setSaveCurrentError] = useState("")
  const [confirmModalText, setConfirmModalText] = useState("")
  const [confirmModalFunc, setConfirmModalFunc] = useState<() => void>(() => () => {})
  const [confirmModalIcon, setConfirmModalIcon] = useState("")
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    multiple: false,
    onFilesSuccessfullySelected: (({filesContent}: SelectedFiles<string>) => {
      filesContent.map((file) => {
        const listName = file.name.replace(/\..+$/, '');
        saveCardList(listName, JSON.parse(file.content ?? ''))
        setCardListNames(cardListNames.concat(listName))
      })
    })
  })

  const saveCurrentCardList = () => {
    if (!cardListName){
      setSaveCurrentError("Card List Name is required")
    } else if (cardListName === ActiveCardListKey || cardListNames.includes(cardListName)) {
      setSaveCurrentError("Card List Name is already in use. Please pick another")
    } else {
      setSaveCurrentError("")
      saveCardList(cardListName, displayedCards)
      setCardListNames(cardListNames.concat(cardListName))
      setCardListName("")
      setSavingCurrent(false)
    }
  }

  const updateDisplayedCards = (newCards: ability_card[]) => {
    saveCardList(ActiveCardListKey, newCards)
    setDisplayedCards(newCards)
  }

  const openSaveModal = (cardListName: string, cards: ability_card[]) => {
    const text = "Are you sure you want to overwrite " + cardListName + " with the current card list? This action cannot be reversed."
    openModal(text, () => {
      saveCardList(cardListName, cards)
      closeModal()
    }, "save")
  }

  const openLoadModal = (cardListName: string) => {
    const text = "Are you sure you want to load " + cardListName + "? Any unsaved displayed cards will be lost. This action cannot be reversed."
    openModal(text, () => {
      updateDisplayedCards(getCardList(cardListName))
      closeModal()
    }, "load")
  }

  const openClearCurrentModal = () => {
    const text = "Are you sure you want to clear the current card list? Any unsaved displayed cards will be lost. This action cannot be reversed."
    openModal(text, () => {
      updateDisplayedCards([])
      closeModal()
    }, "load")
  }

  const openDeleteModal = (cardListName: string) => {
    const text = "Are you sure you want to delete " + cardListName + "? This action cannot be reversed."
    openModal(text, () => {
      deleteCardList(cardListName)
      setCardListNames(getCardListNames() || [])
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
    const cardData = getCardList(ActiveCardListKey)
    const blob = new Blob([JSON.stringify(cardData)], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, exportName + ".json")
    setExporting(false)
    setExportName('')
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
          <button onClick={() => openClearCurrentModal()} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small">
            <HiTrash/>&nbsp;Clear Current Card List
          </button>
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button onClick={() => setSavingCurrent(!savingCurrent)} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small">
            <HiPlus/>&nbsp;Save Current Card List
          </button>
          {savingCurrent &&
            <>
              <div className={`flex items-center gap-3`}>
                  <div className={'font-body text-right'}>Card List Name:</div>
                  <input type='text' className={`block p-2 text-sm border-zinc-300 border-2 text-gray-900 bg-white rounded-lg font-mono flex-auto`} 
                    value={cardListName} onChange={(e: ChangeEvent<HTMLInputElement>) => setCardListName(e.target.value)}/>
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
                  onClick={() => setSavingCurrent(false)}
                  className={`p-2 rounded-xl bg-[#323842] hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Cancel
                </button>
                <button onClick={saveCurrentCardList} className={`p-2 rounded-xl bg-action-card hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Save Card List
                </button>
              </div>
            </>
          }
        </div>
        <div className="bg-zinc-200 rounded-lg p-2 pl-4 pr-4 space-y-1 divide-y divide-zinc-400">
          {cardListNames.map(list => {
            return <>
              <div className="flex flex-row justify-between items-center py-2" key={list}>
                <p className={`line-clamp-1 overflow-hidden`}>{list}</p>
                <span className="flex flex-row space-x-3">
                  <button onClick={() => openDeleteModal(list)}><span className="flex flex-row items-center hover:text-gray-700"><RiDeleteBin6Fill/><span className={`hidden 2xl:block`}>&nbsp;Delete</span></span></button>
                  <button onClick={() => openSaveModal(list, displayedCards)}><span className="flex flex-row items-center hover:text-gray-700"><FaSave /><span className={`hidden 2xl:block`}>&nbsp;Save</span></span></button>
                  <button onClick={() => openLoadModal(list)}><span className="flex flex-row items-center hover:text-gray-700"><ImUpload /><span className={`hidden 2xl:block`}>&nbsp;Load</span></span></button>
                </span>
              </div>
            </>
          })}
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button onClick={() => setExporting(!exporting)} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small">
            <TbFileExport/>&nbsp;Export Current Card List
          </button>
          {exporting &&
            <>
              <div className={`flex items-center gap-3`}>
                  <div className={'font-body text-right'}>File Name:</div>
                  <input type='text' className={`block p-2 text-sm border-zinc-300 border-2 text-gray-900 bg-white rounded-lg font-mono flex-auto`} 
                    value={exportName} onChange={(e: ChangeEvent<HTMLInputElement>) => setExportName(e.target.value)}/>
              </div>
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => setExporting(false)}
                  className={`p-2 rounded-xl bg-[#323842] hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Cancel
                </button>
                <button onClick={exportCardList} className={`p-2 rounded-xl bg-action-card hover:brightness-90 text-lg text-center font-medium font-body leading-none text-cardback`}>
                  Export
                </button>
              </div>
            </>
          }
        </div>
        <div className="bg-zinc-100 rounded-lg p-2 space-y-1">
          <button onClick={() => openFilePicker()} className="flex flex-row font-body text-lg text-center items-center hover:text-gray-700 small">
            <TbFileImport/>&nbsp;Import Card List
          </button>
        </div>
        
      </div>
    }
    {confirmModalText !== "" && 
      <ConfirmModal text={confirmModalText} onSubmit={confirmModalFunc} onCancel={closeModal} icon={confirmModalIcon}/>
    }
    </>
  )
}
