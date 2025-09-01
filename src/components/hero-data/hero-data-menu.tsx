import {all_characteristics, characteristic} from "../../types/ability-card.ts";
import {Bonus, DamageBonus, DistanceBonus, HeroData} from "../../types/character-data.ts";
import {CardList} from "../../types/card-list.ts";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {DisplayedCardListKey, saveCardList} from "../data-saving/saving-service.ts";
import { EditKeywordsInput, EditTextInput, SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements.tsx";
import BonusEditorTopbar from "./bonus-editor-topbar.tsx";

function getNumber(s : string | undefined) : number | undefined {
  if (s === undefined || s === '') {
    return undefined;
  }
  const v = parseInt(s)
  if (v === 0) {
    return 0;
  }
  return v || undefined;
}

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
      } else if (ct.has(c) && getNumber(ct.get(c)) === undefined) {
        // Displayed cards doesn't have characteristic, but text is a number. Reset text
      } else {
        ct.set(c, "")
      }
    }
    setCharacteristicText(ct)
  }, [displayedCards])
  
  const updateDisplayedCards = (newCards: CardList) => {
    saveCardList(DisplayedCardListKey, newCards)
    setDisplayedCards(newCards)
  }

  const onUpdateCharacteristic = (e : ChangeEvent<HTMLInputElement>, c : characteristic) => {
    characteristicText.set(c, e.currentTarget.value)
    const val = getNumber(e.currentTarget.value);

    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.characteristics.set(c, val);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onUpdateBonus = (db : Bonus, i: number) => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus.splice(i, 1, db);
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onUpdateHeroData = (heroData: HeroData) => {
    updateDisplayedCards({...displayedCards, heroData: heroData})
  }

  const onAddDistanceBonus = () => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus = [...hd.bonus, new DistanceBonus({keywordMatcher: [], type:"", distanceType: "", value: 0, replaceKitValue: false})];
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  const onAddDamageBonus = () => {
    const hd = new HeroData(displayedCards.heroData ?? {});
    hd.bonus = [...hd.bonus, new DamageBonus({keywordMatcher: [], type:"", rolledDamageBonus: 0, replaceKitValue: false})];
    updateDisplayedCards({...displayedCards, heroData: hd})
  }

  return (
    <div className={`print:hidden w-full flex flex-col h-full`}>
      <span className="w-full text-center">
        <h1 className="font-bold font-body text-xl small-caps">Hero Data</h1>
      </span>
      <div className={`text-center w-full`}>
        Your cards will be automatically updated to include hero's stats, without affecting the underlying card.
      </div>
      <div className={`w-full flex flex-col justify-start gap-2 p-4 overflow-y-scroll h-full scrollbar`}>
        <div className={`flex-none`}>
          <div className={`gap-1 text-center items-center justify-center`}>
            <SectionSeparator name={'Characteristics'}/>
            <div className="flex flex-row w-full">
              {all_characteristics.map(c => {
                return (<>
                  <div className="flex-auto">
                    <p key={c} className={`col-span-2 text-center font-bold`}>{c}</p>
                    <input className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`} value={characteristicText.get(c)} min={-1} max={6} type="number" onChange={(event) => onUpdateCharacteristic(event, c)}></input>
                  </div>
                </>)
              })}
            </div>
          </div>
        </div>
        <SectionSeparator name={'Bonuses'}/>
        {displayedCards.heroData?.bonus.map((b, i) => {
          if (b instanceof DistanceBonus) {
            const db = b as DistanceBonus;
            return (
              <div key={i} className={`flex-none p-2 grid auto-cols-min auto-rows-min grid-cols-4 w-full gap-2`}>
                <BonusEditorTopbar heroData={displayedCards.heroData ?? {} as HeroData} setHeroData={onUpdateHeroData} index={i} type="Distance Bonus"/>
                <EditTextInput fieldName={'Label'} fieldValue={db.type} onChange={(e) => {
                      const ndb = new DistanceBonus({...db, type: e.target.value ?? ""});
                      onUpdateBonus(ndb, i);
                    }}/>
                <EditKeywordsInput fieldName={'Keyword Matcher'} fieldValues={db.keywordMatcher} onChange={(ks) => {
                      const ndb = new DistanceBonus({...db, keywordMatcher: ks});
                      onUpdateBonus(ndb, i);
                    }}/>
                <EditTextInput fieldName={'Distance Type'} fieldValue={db.distanceType} onChange={(e) => {
                      const ndb = new DistanceBonus({...db, distanceType: e.target.value ?? ''});
                      onUpdateBonus(ndb, i);
                    }}/>
                <div className={`col-span-full w-full`}/>
                  <div className={`flex justify-end items-center`}>
                    <div className={`text-right w-[80pt] font-bold`}>Value:</div>
                  </div>
                  <input value={db.value}
                    type={"number"}
                    onChange={(e) => {
                      const ndb = new DistanceBonus({...db, value: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                      onUpdateBonus(ndb, i);
                    }}
                    className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center col-span-2`}
                  />
                  <div className={`flex justify-end items-center gap-2`}>
                    <div className={`text-right w-[80pt] font-bold`}>Is Kit Bonus:</div>
                    <input type={`checkbox`} checked={db.replaceKitValue} onChange={(e) => {
                      const  ndb = new DistanceBonus({...db, replaceKitValue: e.target.checked})
                      onUpdateBonus(ndb, i)
                    }} className={`border-2 border-stone-400 p-1`}/>
                  </div>
              </div>
            )
          } else if (b instanceof DamageBonus) {
            const db = b as DamageBonus;
            return (
              <div key={i} className={`flex-none p-2 grid auto-cols-min auto-rows-min grid-cols-4 w-full gap-2`}>
                <BonusEditorTopbar heroData={displayedCards.heroData ?? {} as HeroData} setHeroData={onUpdateHeroData} index={i} type="Damage Bonus"/>
                <EditTextInput fieldName={'Label'} fieldValue={db.type} onChange={(e) => {
                      const ndb = new DamageBonus({...db, type: e.target.value ?? ""});
                      onUpdateBonus(ndb, i);
                    }}/>
                <EditKeywordsInput fieldName={'Keyword Matcher'} fieldValues={db.keywordMatcher} onChange={(ks) => {
                      const ndb = new DamageBonus({...db, keywordMatcher: ks});
                      onUpdateBonus(ndb, i);
                    }}/>
                
                  {db.isFlatBonus() ?
                    <><div className={`flex justify-end items-center`}>
                        <div className={`text-right w-[80pt] font-bold`}>Flat Bonus:</div>
                      </div>
                      <input  type={`number`} value={db.rolledDamageBonus as number} onChange={(e) => {
                      const ndb = new DamageBonus({...db, rolledDamageBonus: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0});
                      onUpdateBonus(ndb, i);
                    }} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center col-span-2`}></input></> :
                    <>
                      <div className={`flex justify-end items-center`}>
                        <div className={`text-right w-[80pt] font-bold`}>Tiered Bonus:</div>
                      </div>
                      <div className="col-span-2">
                        <input type={`number`} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`} value={(db.rolledDamageBonus as {t1: number}).t1} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t2: db.getBonusForTier(2), t3: db.getBonusForTier(3)}});
                          onUpdateBonus(ndb, i);
                        }} ></input>/
                        <input type={`number`} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`} value={(db.rolledDamageBonus as {t2: number}).t2} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0, t3: db.getBonusForTier(3)}});
                          onUpdateBonus(ndb, i);
                        }}></input>/
                        <input type={`number`} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`} value={(db.rolledDamageBonus as {t3: number}).t3} onChange={(e) => {
                          const ndb = new DamageBonus({...db, rolledDamageBonus: {t1: db.getBonusForTier(1), t2: db.getBonusForTier(2), t3: e.target.value && e.target.value.length > 0 ? parseInt(e.target.value) : 0}});
                          onUpdateBonus(ndb, i);
                        }}></input>
                      </div>
                    </>
                  }
                  <div className={`flex justify-end items-center gap-2`}>
                    <div className={`text-right w-[80pt] font-bold`}>Is Kit Bonus:</div>
                    <input type={`checkbox`} checked={db.replaceKitValue} onChange={(e) => {
                      const  ndb = new DamageBonus({...db, replaceKitValue: e.target.checked})
                      onUpdateBonus(ndb, i)
                    }} className={`border-2 border-stone-400 p-1`}/>
                  </div>
                  <button className={`col-start-2 col-span-2 bg-zinc-100 hover:bg-white border-2 border-stone-600 rounded-lg min-h-[24pt] px-5`} onClick={() => {
                    const ndb = new DamageBonus({...db, rolledDamageBonus: db.isFlatBonus() ? {t1: 1, t2: 1, t3: 1} : 1});
                    onUpdateBonus(ndb, i);
                  }}>{db.isFlatBonus() ? 'Switch to Tier Damage' : 'Switch to Flat Damage'}</button>
              </div>
            )
          }
          return;
        })}
        <div className={`col-span-full divide-x divide-black w-full min-h-[24pt] overflow-hidden bg-stone-400 border-2 border-stone-600 rounded-lg flex`}>
          <div role={`button`} className={`basis-1/2 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => onAddDistanceBonus()}>
            <div>Add Distance Bonus</div>
          </div>
          <div role={`button`} className={`basis-1/2 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => onAddDamageBonus()}>
            <div>Add Damage Bonus</div>
          </div>
        </div>
    </div>
  </div>)
}
