import {asNewCard, asOldCard, Card, getCardTitle, isNewCard} from "../../types/card-list.ts";
import AbilityCard from "../ability-card/ability-card.tsx";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {HeroData} from "../../types/character-data.ts";
import {Dispatch, useEffect, useState} from "react";
import {FaSave, FaShare, FaTrash} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {saveImage} from "../../utils/download-utils.ts";
import {toast} from "react-toastify";
import {EditCardMenu} from "../editable-ability-card-root/edit-card-menu/edit-card-menu.tsx";
import {UpgradeCard} from "../../utils/ability-card-upgrader.ts";
import CardEditor from "./card-editor/card-editor.tsx";

export type CloseCallbackFunction = (_: Card | undefined) => void;
export type DeleteCallbackFunction = () => void;

function OldCardMenu({editCard, setEditCard}:{editCard : Card, setEditCard : Dispatch<Card>}) {
  return (<>
    <div role={`button`} onClick={() => {
      setEditCard(UpgradeCard(asOldCard(editCard)));
      toast.success("Upgraded")
    }} className={`bg-slate-600 border-4 border-treasure-card rounded-3xl text-white text font-bold p-3`}>This is a legacy card. Click here to upgrade to V2</div>
    <EditCardMenu card={asOldCard(editCard)} cardNum={1} updateCard={(_, c) => setEditCard(c)}/>
  </>);
}

export default function EditSidebarModal({callback, deleteCallback, card, heroStats}: {callback: CloseCallbackFunction, deleteCallback: DeleteCallbackFunction, card: Card | undefined, heroStats: HeroData | undefined}) {
  const [editCard, setEditCard] = useState(card)
  const [useBlankHeroStats, setUseBlankHeroStats] = useState(false)
  useEffect(() => {
    setEditCard(card)
  }, [card])
  const closeModal = () => {
    callback(editCard);
  }

  const deleteCard = () => {
    deleteCallback()
  }

  const handleCheckbox = (): void => {
    setUseBlankHeroStats(!useBlankHeroStats);
  };

  return (<>
    {editCard && <div className={`fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-end print:hidden`}>
      <div role={`button`} onClick={closeModal} className={`flex-grow`}/>
      <div className={`flex-none w-[50pt] flex flex-col`}>
        <div className={`h-[50pt] w-[50pt]`}></div>
        <div role={`button`} onClick={closeModal} className={`h-[50pt] w-[50pt] bg-action-card flex items-center justify-center`}>
          <FaSave className={`text-white text-[25pt]`}/>&nbsp;
        </div>
        <div role={`button`} onClick={() => saveImage(editCard, `editcard_${getCardTitle(editCard)}_card`)} className={`h-[50pt] w-[50pt] bg-maneuver-card flex items-center justify-center`}>
          <IoMdDownload className={`text-white text-[30pt]`}/>&nbsp;
        </div>
        <div role={`button`} onClick={()=>{
          toast.warning("Doesn't work yet, will copy a link to clipboard to share card")
        }} className={`h-[50pt] w-[50pt] bg-routine-card flex items-center justify-center`}>
          <FaShare className={`text-white text-[25pt]`}/>&nbsp;
        </div>
        <div role={`button`} onClick={deleteCard} className={`h-[50pt] w-[50pt] bg-triggered-action-card flex items-center justify-center`}>
          <FaTrash className={`text-white text-[25pt]`}/>&nbsp;
        </div>
      </div>
      <div className={`h-full rounded-tl-[20pt] rounded-bl-[20pt] bg-sidebar-back flex flex-col items-center outline outline-4 outline-sidebar-trim border-sidebar-trim pl-[20pt] pr-[12.5pt] py-[20pt] gap-[10pt] overflow-y-scroll`}>
        <div className={`w-[511.5pt] pr-[2pt]`}>
          <AbilityCard id={`editcard`} card={isNewCard(editCard) ? DowngradeCard(asNewCard(editCard), useBlankHeroStats ? new HeroData({}) : heroStats) : asOldCard(editCard)} enlargedState={1}/>
        </div>
        {isNewCard(editCard) ?
          <>
            <div className={`w-[511.5pt] pr-[2pt] flex items-center justify-center`}>
              <label><input type={`checkbox`} checked={useBlankHeroStats} onChange={handleCheckbox}/>  Use Blank Hero Stats</label>
            </div>
            <CardEditor card={editCard} setCard={setEditCard}/>
          </> :
          <OldCardMenu editCard={editCard} setEditCard={setEditCard}/>
        }
      </div>
    </div>}
  </>)
}
