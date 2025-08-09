import {asNewCard, asOldCard, Card, getCardTitle, isNewCard} from "../../types/card-list.ts";
import AbilityCard from "../ability-card/ability-card.tsx";
import {DowngradeCard} from "../../utils/ability-card-downgrader.ts";
import {HeroData} from "../../types/character-data.ts";
import {TextEditor} from "../editable-ability-card-root/edit-card-menu/text-editor.tsx";
import {useEffect, useState} from "react";
import {FaSave} from "react-icons/fa";
import {IoMdDownload} from "react-icons/io";
import {saveImage} from "../../utils/download-utils.ts";

export type CallbackFunction = (_: Card) => void;

export default function EditSidebarModal({callback, card, heroStats}: {callback: CallbackFunction, card: Card | undefined, heroStats: HeroData | undefined}) {
  const [editCard, setEditCard] = useState(card)
  const [useBlankHeroStats, setUseBlankHeroStats] = useState(false)
  useEffect(() => {
    setEditCard(card)
  }, [card])
  const closeModal = () => {
    if (editCard) {
      callback(editCard)
    }
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
      </div>
      <div className={`h-full rounded-tl-[20pt] rounded-bl-[20pt] bg-stone-300 flex flex-col items-center border-4 border-stone-400 p-[20pt] gap-[10pt]`}>
        <AbilityCard id={`editcard`} card={isNewCard(editCard) ? DowngradeCard(asNewCard(editCard), useBlankHeroStats ? new HeroData({}) : heroStats) : asOldCard(editCard)} cardNum={1} selectedCard={1} setSelectedCard={() => {}}/>
        <label><input type={`checkbox`} checked={useBlankHeroStats} onChange={handleCheckbox}/>Use Blank Hero Stats</label>
        <TextEditor card={editCard} cardNum={1} updateCard={(_, c) => setEditCard(c)}/>
      </div>
    </div>}
  </>)
}
