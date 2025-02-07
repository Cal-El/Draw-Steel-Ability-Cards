import { ChangeEvent, useState } from "react";
import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";
import { ActiveCardListKey, getCardListNames, saveCardList } from "../data-saving/saving-service";
import { HiPlus } from "react-icons/hi";
import { ability_card } from "../../types/ability-card-types";

export default function Sidebar({open, toggleOpen, displayedCards}: {open: boolean, toggleOpen: () => void, displayedCards: ability_card[]}){
  const [cardListNames, setCardListNames] = useState<string[]>(getCardListNames() || [])
  const [savingCurrent, setSavingCurrent] = useState(false)
  const [cardListName, setCardListName] = useState("")
  const [saveCurrentError, setSaveCurrentError] = useState("")

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

  return (
    <>
    <button className="text-3xl m-3 float-right hover:text-gray-700" onClick={toggleOpen}>
      { open ? 
        <RiMenuFold4Line/>
        : <RiMenuUnfold4Line/>
      }
    </button>
    {open &&
      <div className="m-3 space-y-2">
        <h1 className="text-xl font-body font-semibold small-caps">Card Lists</h1>
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
        {cardListNames.map(list => {
          return <>
            <p id="list">{list}</p>
          </>
        })}
      </div>
    }
    </>
  )
}
