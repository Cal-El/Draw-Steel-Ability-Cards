import {asNewCard, asOldCard, Card, getCardTitle, getCardTopMatter, isNewCard} from "../../types/card-list.ts";
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
import {cardManifest} from "../../types/generated/card-manifest.ts";
import {parse as yamlParse} from "yaml";
import {ability_card} from "../../types/ability-card-types.ts";

export type CloseCallbackFunction = (_: Card | undefined) => void;
export type DeleteCallbackFunction = () => void;

async function getMatchingCardsFromManifest(c: Card, callback: (cs:Card[]) => void) {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const matches = await Promise.all(cardManifest
    .flatMap(e => e.options)
    .filter(e => e.label.split(' (')[0].toLowerCase() === getCardTitle(c).toLowerCase())
    .map(manifestEntry => fetch(baseUrl + manifestEntry?.value)
      .then(r => r.text())
      .then(r => yamlParse(r) as ability_card)
    ));

  callback(matches)
}

function OldCardMenu({editCard, setEditCard, newDefaults, newDefaultsLoading}:{editCard : Card, setEditCard : Dispatch<Card>, newDefaults : Card[], newDefaultsLoading: boolean}) {
  return (<>
    <div className={`w-[509.5pt] flex flex-col gap-2`}>
      <div className={`text-black text-md text-center`}>
        <span className={`font-bold`}>This is using an old data model!</span><br/>
        As is, it won't make use of Hero Stats and can't be displayed with new card designs.
      </div>
      <div className={`flex justify-center gap-2`}>
        {!newDefaultsLoading && newDefaults.map(c => {
          return(
            <div key={getCardTopMatter(c)} role={`button`} onClick={() => {
              setEditCard(c);
              toast.success("Upgraded")
            }} className={`flex-1 bg-slate-600 border-4 border-treasure-card rounded-3xl text-white text-center p-3`}>
              Found matching card!<br/>
              <span className={`font-bold`}>
                "{getCardTitle(c)} ({getCardTopMatter(c)})"<br/>
              </span>
              Replaces the card with the latest default
            </div>
          );
        })}
        {!newDefaultsLoading && newDefaults.length===0 &&
          <div key={'noManifest'} role={`button`}
               className={`flex-1 bg-gray-300 border-4 border-free-strike-card rounded-3xl text-gray-600 text-center p-3`}>
            <span className={`font-bold`}>
              No default found for "{getCardTitle(editCard)}"<br/>
            </span>
            Cannot load a replacement V2 card
          </div>
        }
      </div>
      <div role={`button`} onClick={() => {
        setEditCard(UpgradeCard(asOldCard(editCard)));
        toast.success("Upgraded")
      }} className={`flex-1 bg-slate-600 border-4 border-treasure-card rounded-3xl text-white text-center p-3`}>
          <span className={`font-bold`}>
            Use a best-effort upgrader<br/>
          </span>
        You may need to fix some things
      </div>
    </div>
    <EditCardMenu card={asOldCard(editCard)} cardNum={1} updateCard={(_, c) => setEditCard(c)}/>
  </>);
}

export default function EditSidebarModal({callback, deleteCallback, card, heroStats}: {callback: CloseCallbackFunction, deleteCallback: DeleteCallbackFunction, card: Card | undefined, heroStats: HeroData | undefined}) {
  const [editCard, setEditCard] = useState(card)
  const [useBlankHeroStats, setUseBlankHeroStats] = useState(false)
  const [newDefaults, setNewDefaults] = useState([] as Card[]);
  const [newDefaultsLoading, setNewDefaultsLoading] = useState(false);

  useEffect(() => {
    setEditCard(card)
    if (card && !isNewCard(card)) {
      setNewDefaultsLoading(true);
      getMatchingCardsFromManifest(card, (cs) => {
        setNewDefaults(cs)
        setNewDefaultsLoading(false);
      })
    }
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
        <div className={`w-[511.5pt] pr-[2pt] place-items-center`}>
          <AbilityCard id={`editcard`} card={isNewCard(editCard) ? DowngradeCard(asNewCard(editCard), useBlankHeroStats ? new HeroData({}) : heroStats) : asOldCard(editCard)} enlargedState={0}/>
        </div>
        {isNewCard(editCard) ?
          <>
            <div className={`w-[511.5pt] pr-[2pt] flex items-center justify-center`}>
              <label><input type={`checkbox`} checked={useBlankHeroStats} onChange={handleCheckbox}/>  Use Blank Hero Stats</label>
            </div>
            <CardEditor card={editCard} setCard={setEditCard}/>
          </> :
          <OldCardMenu editCard={editCard} setEditCard={setEditCard} newDefaults={newDefaults} newDefaultsLoading={newDefaultsLoading}/>
        }
      </div>
    </div>}
  </>)
}
