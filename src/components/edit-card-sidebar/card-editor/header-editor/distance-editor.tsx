import {ability_card, abilityTypeValues} from "../../../../types/ability-card.ts";
import {ChangeEvent, ClipboardEvent, Dispatch, useEffect, useState} from "react";
import {Card} from "../../../../types/card-list.ts";
import { getDynamicColorBase } from "../../../../utils/color-calculator.ts";

export default function DistanceEditor({card, onChange}: {card: ability_card, onChange: Dispatch<Card>}) {
  const [displayText, setDisplayText] = useState(card.header.distance.display);
  useEffect(() => {
    setDisplayText(card.header.distance.display);
  }, [card])

  const pasteDistanceText = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    console.log(pasteData)
    if (!(
      (card.header.keywords.includes('Magic') || card.header.keywords.includes('Psionic') || card.header.keywords.includes('Weapon'))
      && (card.header.keywords.includes('Ranged') || card.header.keywords.includes('Melee'))
    )) {
      changeDistanceText(pasteData)
      return
    }

    const within = new RegExp(/(.*? within )(\d+)(.*?)/)
    const meleeOrRanged = new RegExp(/melee (\d+) or ranged (\d+)/)
    const melee = new RegExp(/melee (\d+)/)
    const ranged = new RegExp(/ranged (\d+)/)

    let match = within.exec(pasteData)
    if (match) {
      changeDistanceText(`${match[1]}[${match[2]}]${match[3]}`)
      return
    }

    match = meleeOrRanged.exec(pasteData.toLowerCase())
    if (match) {
      changeDistanceText(`Melee [${match[1]}] or Ranged [${match[2]}]`)
      return
    }

    match = melee.exec(pasteData.toLowerCase())
    if (match) {
      changeDistanceText(`Melee [${match[1]}]`)
      return
    }

    match = ranged.exec(pasteData.toLowerCase())
    if (match) {
      changeDistanceText(`Ranged [${match[1]}]`)
      return
    }
    changeDistanceText(pasteData)
  };

  const changeDistanceText = (e: string) => {
    const vals = [...card.header.distance.values]
    let valsHandled = -1;
    let priorWord = '';
    const cVals = e.split(' ').map((s) => {
      if (s.startsWith('[') && s.endsWith(']')) {
        valsHandled++;
        if (vals.length <= valsHandled) {
          const v = parseInt(s.slice(1, s.length - 1));
          if (priorWord.toLowerCase() === 'within' && (card.header.keywords.includes('Magic') || card.header.keywords.includes('Psionic') || card.header.keywords.includes('Weapon'))) {
            if (card.header.keywords.includes('Melee')) {
              priorWord = 'Melee';
            } else if (card.header.keywords.includes('Ranged')) {
              priorWord = 'Ranged';
            }
          }
          return {type: priorWord, baseValue: v || 0, includedKitValue: 0}
        } else {
          return vals[valsHandled];
        }
      } else {
        priorWord = s;
        return undefined;
      }
    }).filter(s => s !== undefined);

    onChange({...card, header: {...card.header, distance: {...card.header.distance, display: e, values: cVals}}})
  };

  const changeBaseValue = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const displayText = card.header.distance.display;
    let ignoredOpenBrkts = 0;
    let valStartIdx = -1;
    let valEndIdx = -1;

    for (let j = 0; j < displayText.length; j++) {
      if (displayText[j] === '[') {
        if (ignoredOpenBrkts >= i) {
          valStartIdx = j;
        } else {
          ignoredOpenBrkts++
        }
      } else if (valStartIdx >= 0 && displayText[j] === ']') {
        valEndIdx = j;
      }
    }

    const temp = [...card.header.distance.values]
    temp[i].baseValue = parseInt(e.target.value) || 0;
    const newDisplay = displayText.slice(0, valStartIdx) + '[' + temp[i].baseValue + displayText.slice(valEndIdx)
    onChange({...card, header: {...card.header, distance: {display: newDisplay, values: temp}}})
  }

  const distanceDisplay = () => {
    let i = 0;
    let val = displayText.split(' ').map(x => {
      if (x.startsWith('[') && x.endsWith(']')) {
        i++;
        return (<span className={`font-bold`}
                      style={{color:getDynamicColorBase(abilityTypeValues[i-1], {})}}>{x} </span>)
      }
      else {
        return (<span className={`italic text-stone-700`}>{x} </span>)
      }
    })
    if (i === 0) val = [<span className={`italic text-stone-700`}>Use '[n]' note customisable values</span>]

    return val
  }

  return(<>
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <div className={`flex justify-end items-start w-full py-1`}>
        <div className={`font-bold text-right`}>Distance:</div>
      </div>
      <div className={`col-span-3 flex gap-2 items-center`}>
        <div>
          <input value={card.header.distance.display} onPaste={pasteDistanceText} onChange={(e) => changeDistanceText(e.target.value)}
                 className={`border-2 border-stone-400 bg-white p-1`}/>
        </div>
        <div className={`py-1 px-2`}>
          {distanceDisplay()}
        </div>
      </div>
      {card.header.distance.values.map((v, i) => {
        return (<>
          <div/>
          <div className={`col-span-3 flex gap-2`}>
            <div className={`col-span-1 border-r-2 text-2xl font-bold flex justify-end items-center p-2`}
              style={{borderColor: getDynamicColorBase(abilityTypeValues[i], {}), color: getDynamicColorBase(abilityTypeValues[i], {})}}>
              {i+1}
            </div>
            <div className={`w-full grid grid-cols-[80pt_40pt_140pt_40pt] auto-cols-min gap-2`}>
              <div className={`flex justify-end items-center w-full`}>
                <div className={`text-right`}>Bonus Type:</div>
              </div>
              <input value={v.type} onChange={(e) => {
                const temp = [...card.header.distance.values]
                temp[i].type = e.target.value;
                onChange({...card, header: {...card.header, distance: {...card.header.distance, values: temp}}})
              }} className={`col-span-3 border-2 border-stone-400 p-1 w-full`}></input>
              <div className={`flex justify-end items-center w-full`}>
                <div className={`text-right flex-shrink`}>Value:</div>
              </div>
              <input value={v.baseValue} type={"number"} onChange={(e) => changeBaseValue(e, i)}
                     className={`border-2 border-stone-400 p-1 w-full flex-none text-center`}></input>
              <div className={`flex justify-end items-center w-full`}>
                <div className={`text-right flex-grow line-clamp-1`}>Included Kit Value:</div>
              </div>
              <input value={v.includedKitValue} type={"number"} onChange={(e) => {
                const temp = [...card.header.distance.values]
                temp[i].includedKitValue = parseInt(e.target.value);
                onChange({...card, header: {...card.header, distance: {...card.header.distance, values: temp}}})
              }} className={`border-2 border-stone-400 p-1 w-full flex-none text-center`}></input>
            </div>
          </div>
        </>)
      })}
    </div>
  </>);
}
