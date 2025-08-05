import {all_characteristics, characteristic} from "../types/ability-card.ts";
import {Bonus, DamageBonus, DistanceBonus, HeroData} from "../types/character-data.ts";
import {CardList} from "../types/card-list.ts";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {DisplayedCardListKey, saveCardList} from "./data-saving/saving-service.ts";

export default function HeroDataMenu({displayedCards, setDisplayedCards}: {
    displayedCards: CardList,
    setDisplayedCards: Dispatch<SetStateAction<CardList>>
}){
  const [characteristicText, setCharacteristicText] = useState(new Map<characteristic, string>());
  useEffect(() => {
    const ct = new Map(characteristicText.entries())
    for (const c of all_characteristics) {
      if (displayedCards.heroData && displayedCards.heroData.characteristics.has(c)) {
        ct.set(c, (displayedCards.heroData.characteristics.get(c) ?? 0).toString())
      } else if (!ct.has(c)) {
        ct.set(c, "")
      }
    }
    setCharacteristicText(ct)
  }, [displayedCards])
  
  const [isOpen, setIsOpen] = useState(false);

  const updateDisplayedCards = (newCards: CardList) => {
    saveCardList(DisplayedCardListKey, newCards)
    setDisplayedCards(newCards)
  }

  const onUpdateCharacteristic = (e : ChangeEvent<HTMLInputElement>, c : characteristic) => {
    characteristicText.set(c, e.currentTarget.value)
    const val = e.currentTarget.value && e.currentTarget.value.length > 0 ? parseInt(e.currentTarget.value) || undefined : undefined;

    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.characteristics.set(c, val);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onUpdateBonus = (db : Bonus, i: number) => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus.splice(i, 1, db);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onRemoveBonus = (i: number) => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus.splice(i, 1);
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

  return (
    <div className={`print:hidden w-full flex flex-col bg-stone-300`}>
      {isOpen && <div className={`text-center w-full`}>
        <span className={`font-bold`}>[!] This feature is still under construction [!]</span><br/>
        You can update and save hero stats to your card-lists and they will impact any cards using Version 2 card data. However, there is not currently a way to make or update a Version 2 card.
      </div>}
      {isOpen && <div className={`w-full flex justify-start gap-2 p-2 overflow-x-scroll`}>
        <div className={`flex-none`}>
          <div className={`grid grid-cols-3 auto-rows-min p-2 gap-1 text-center items-center justify-center bg-stone-200`}>
            <div className={`col-span-full font-bold`}>Characteristics</div>
            {all_characteristics.map(c => {
              return (<>
                <p key={c} className={`col-span-2 text-right`}>{c}: </p><input className={`w-[20pt] text-center`} value={characteristicText.get(c)} onChange={(event) => onUpdateCharacteristic(event, c)}></input>
              </>)
            })}
          </div>
        </div>
        {displayedCards.heroData?.bonus.map((b, i) => {
          if (b instanceof DistanceBonus) {
            const db = b as DistanceBonus;
            return (
              <div key={i} className={`flex-none p-2 bg-stone-200`}>
                <div className={`flex justify-between h-[20pt]`}><div className={`font-bold`}>Distance Bonus</div> <button className={`bg-stone-300 font-bold h-[18pt] w-[18pt]`} onClick={() => onRemoveBonus(i)}>×</button></div>
                <div className={`grid auto-rows-min grid-cols-3 gap-1 justify-between items-center`}>
                  <div className={`col-span-1`}>Type: </div><input className={`col-span-2`} value={db.type} onChange={(e) => {
                  const ndb = new DistanceBonus({...db, type: e.target.value ?? ""});
                  onUpdateBonus(ndb, i);
                }}></input>
                  <div className={`col-span-full`}>
                    <div className={`w-full`}>Keyword Matcher:</div>
                    <input className={`w-full`} value={db.keywordMatcher.join(", ")} onChange={(e) => {
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
              <div key={i} className={`flex-none p-2 bg-stone-200`}>
                <div className={`flex justify-between h-[20pt]`}><div className={`font-bold`}>Damage Bonus</div> <button className={`bg-stone-300 font-bold h-[18pt] w-[18pt]`} onClick={() => onRemoveBonus(i)}>×</button></div>
                <div className={`grid auto-rows-min grid-cols-3 gap-1 justify-between items-center`}>
                  <div className={`col-span-1`}>Type: </div><input className={`col-span-2`} value={db.type} onChange={(e) => {
                  const ndb = new DamageBonus({...db, type: e.target.value ?? ''});
                  onUpdateBonus(ndb, i);
                }}></input>
                  <div className={`col-span-full`}>
                    <div className={`w-full`}>Keyword Matcher:</div>
                    <input className={`w-full`} value={db.keywordMatcher.join(", ")} onChange={(e) => {
                      const ndb = new DamageBonus({...db, keywordMatcher: (e.target.value ?? '').split(', ')});
                      onUpdateBonus(ndb, i);
                    }}></input>
                  </div>
                  {db.isFlatBonus() ?
                    <><div className={`col-span-1 text-right`}>Flat bonus: </div><input type={`number`} className={`col-span-2`} value={db.rolledDamageBonus as number} onChange={(e) => {
                      const ndb = new DamageBonus({...db, rolledDamageBonus: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                      onUpdateBonus(ndb, i);
                    }}></input></> :
                    <div className={`col-span-full flex`}>
                      <div className={`flex-grow text-right`}>Tiered bonus:</div><div className={`w-[2pt]`}/>
                        <input type={`number`} className={`w-[20pt] text-center`} value={(db.rolledDamageBonus as {t1: number}).t1} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t2: db.getBonusForTier(2), t3: db.getBonusForTier(3)}});
                          onUpdateBonus(ndb, i);
                        }}></input>/
                        <input type={`number`} className={`w-[20pt] text-center`} value={(db.rolledDamageBonus as {t2: number}).t2} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t3: db.getBonusForTier(3)}});
                          onUpdateBonus(ndb, i);
                        }}></input>/
                        <input type={`number`} className={`w-[20pt] text-center`} value={(db.rolledDamageBonus as {t3: number}).t3} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: db.getBonusForTier(2), t3: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0}});
                          onUpdateBonus(ndb, i);
                        }}></input>
                    </div>
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
        <div className={`flex-none flex flex-col justify-between items-center gap-2 max-w-[60pt]`}>
          <button className={`p-2 flex-grow bg-stone-200 text-stone-700 font-bold`} onClick={() => onAddDistanceBonus()}>Add Distance Bonus</button>
          <button className={`p-2 flex-grow bg-stone-200 text-stone-700 font-bold`} onClick={() => onAddDamageBonus()}>Add Damage Bonus</button>
        </div>
    </div>
      }
      <button className={`w-full bg-stone-400 text-stone-700 text-center font-bold`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Hero Stats' : 'Open Hero Stats'}
      </button>
  </div>)
}
