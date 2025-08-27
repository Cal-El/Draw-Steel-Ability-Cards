import {asNewCard, Card} from "../../types/card-list.ts";
import {ChangeEvent, ChangeEventHandler, ClipboardEvent, Dispatch, FormEventHandler, useEffect, useState} from "react";
import {TextEditor} from "../editable-ability-card-root/edit-card-menu/text-editor.tsx";
import {
  ability_card,
  abilityTypeValues,
  all_characteristics,
  characteristic,
  effect,
  power_roll, power_roll_tier,
  spacer
} from "../../types/ability-card.ts";
import Select from "react-select";
import {keywords, rawKeywords} from "../../types/keywords.ts";
import {
  actionBg20ColorStyle,
  actionBg40ColorStyle,
  actionTextColorStyle,
  borderColorStyle
} from "../../types/ability-card-types.ts";
import {HiArrowDown, HiArrowUp, HiX} from "react-icons/hi";

function EditorTypeSwitch({useTextEditor, setUseTextEditor} : {useTextEditor : boolean, setUseTextEditor : Dispatch<boolean>}) {
  return (
    <div className={`w-full min-h-[24pt] overflow-hidden bg-stone-400 border-2 border-stone-600 rounded-lg flex`}>
      <div role={`button`} className={`basis-1/2 ${useTextEditor ? `bg-zinc-50` : 'bg-zinc-200'} flex justify-center items-center`} onClick={() => setUseTextEditor(false)}>
        <div>Editor UI</div>
      </div>
      <div role={`button`} className={`basis-1/2 ${!useTextEditor ? `bg-zinc-50` : 'bg-zinc-200'} flex justify-center items-center`} onClick={() => setUseTextEditor(true)}>
        <div>YAML Editor</div>
      </div>
    </div>
  );
}

function EditTextInput({fieldName, fieldValue, onChange, isBold=true}: {fieldName: string, fieldValue: string, onChange: ChangeEventHandler<HTMLInputElement>, isBold:boolean}) {
  return <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <input value={fieldValue} onChange={onChange} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
  </div>;
}

function EditTextAreaInput({fieldName, fieldValue, onChange, isBold=true}: {fieldName: string, fieldValue: string, onChange: FormEventHandler<HTMLTextAreaElement>, isBold:boolean}) {
  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-start`}>
    <div className={`flex justify-end items-center w-full py-1`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <textarea rows={3}
              value={fieldValue}
              onInput={onChange}
              className={`col-span-3 border-2 border-stone-400 p-1`}
              placeholder="Write your thoughts here...">
        </textarea>
  </div>
}

function EditKeywordsInput({fieldName, fieldValues, onChange}: {fieldName: string, fieldValues: string[], onChange: (ks: string[]) => void}) {
  const [keywordsInputVal, setKeywordsInputVal] = useState("");

  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-center`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`font-bold text-right`}>{fieldName}:</div>
    </div>
    <Select
      inputValue={keywordsInputVal}
      value={fieldValues.map((s) => {return {label: s, value: s}})}
      onInputChange={(newValue) => {
        if (newValue.includes(", ")) {
          const values = newValue.split(", ");
          let ks : string[] = []
          let os : string[] = []
          for (const v of values) {
            if (rawKeywords.includes(v)) {
              ks = [...ks, v];
            } else {
              os = [...os, v];
            }
          }
          onChange(ks.sort())
          setKeywordsInputVal(os.join(", "));
        } else {
          setKeywordsInputVal(newValue);
        }
      }}
      onChange={(newValue) => onChange(newValue.map((x) => {return x.value}).sort())}
      options={keywords}
      isMulti
      className={`col-span-3 border-2 border-stone-400`}
      theme={(t) => ({
        ...t,
        borderRadius: 0,
      })}
    />
  </div>
}

function EditCharacteristicInput({fieldName, fieldValues, onChange, isBold=true}: {fieldName: string, fieldValues: string[] | string, onChange: (ks: characteristic[]) => void, isBold:boolean},) {
  const [keywordsInputVal, setKeywordsInputVal] = useState("");
  const cOptions = all_characteristics.map((s) => {return {value: s, label: s}})
  const fv = (fieldValues as string[]).map ? fieldValues as string[] : [fieldValues as string]

  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-center`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <Select
      inputValue={keywordsInputVal}
      value={fv.map((s) => {return {label: s, value: s}})}
      onInputChange={(newValue) => {
        if (newValue.includes(", ")) {
          const values = newValue.split(", ");
          let ks : characteristic[] = []
          let os : string[] = []
          for (const v of values) {
            if (all_characteristics.includes(v as characteristic)) {
              ks = [...ks, v as characteristic];
            } else {
              os = [...os, v];
            }
          }
          onChange(ks.sort())
          setKeywordsInputVal(os.join(", "));
        } else {
          setKeywordsInputVal(newValue);
        }
      }}
      onChange={(newValue) => onChange(newValue.map((x) => {return x.value as characteristic}).sort())}
      options={cOptions}
      isMulti
      className={`col-span-3 border-2 border-stone-400`}
      theme={(t) => ({
        ...t,
        borderRadius: 0,
      })}
    />
  </div>
}

function EditDistance({card, onChange}: {card: ability_card, onChange: Dispatch<Card>}) {
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
        return (<span className={`font-bold ${actionTextColorStyle[abilityTypeValues[i-1]]}`}>{x} </span>)
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
                 className={`border-2 border-stone-400 bg-white py-1 px-2`}/>
        </div>
        <div className={`py-1 px-2`}>
          {distanceDisplay()}
        </div>
      </div>
      {card.header.distance.values.map((v, i) => {
        return (<>
          <div/>
          <div className={`col-span-3 flex gap-2`}>
            <div className={`col-span-1 border-r-2 ${borderColorStyle[abilityTypeValues[i]]} text-2xl font-bold flex justify-end items-center ${actionTextColorStyle[abilityTypeValues[i]]} p-2`}>
              {i+1}
            </div>
            <div className={`w-full grid grid-cols-[80pt_40pt_140pt_40pt] auto-cols-min gap-2`}>
                <div className={`flex justify-end items-center w-full`}>
                  <div className={`font-bold text-right`}>Bonus Type:</div>
                </div>
                <input value={v.type} onChange={(e) => {
                  const temp = [...card.header.distance.values]
                  temp[i].type = e.target.value;
                  onChange({...card, header: {...card.header, distance: {...card.header.distance, values: temp}}})
                }} className={`col-span-3 border-2 border-stone-400 p-1 w-full`}></input>
                <div className={`flex justify-end items-center w-full`}>
                  <div className={`font-bold text-right flex-shrink`}>Value:</div>
                </div>
                <input value={v.baseValue} type={"number"} onChange={(e) => changeBaseValue(e, i)}
                       className={`border-2 border-stone-400 p-1 w-full flex-none text-center`}></input>
                <div className={`flex justify-end items-center w-full`}>
                  <div className={`font-bold text-right flex-grow line-clamp-1`}>Included Kit Value:</div>
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

function BodyEditorTopbar({card, setCard, bodyIdx, type} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number, type: string}) {
  const moveBodyUp = () => {
    const body = [...card.body]
    const thisStatement = body[bodyIdx]
    body.splice(bodyIdx, 1)
    body.splice(bodyIdx-1, 0, thisStatement)
    setCard({...card, body: body})
  }

  const moveBodyDown = () => {
    const body = [...card.body]
    const thisStatement = body[bodyIdx]
    body.splice(bodyIdx, 1)
    body.splice(bodyIdx+1, 0, thisStatement)
    setCard({...card, body: body})
  }

  const deleteBody = () => {
    const body = [...card.body]
    body.splice(bodyIdx, 1)
    setCard({...card, body: body})
  }

  return <div className={`col-span-full flex items-center`}>
    <span className={`w-4`}/>
    <span className={`text-xs small-caps font-bold pb-1`}>{bodyIdx + 1}: {type}</span>
    <span className={`w-2`}/>
    <hr className={`flex-grow border-gray-300`}/>
    {bodyIdx !== 0 &&
      <button onClick={moveBodyUp}
        className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowUp color={`rgb(55 65 81)`}/>
      </button>
    }
    {bodyIdx !== card.body.length - 1 &&
      <button onClick={moveBodyDown}
              className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowDown color={`rgb(55 65 81)`}/>
      </button>
    }
    <hr className={`border-gray-300 w-4`}/>
    <button onClick={deleteBody}
            className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
      <HiX color={`rgb(55 65 81)`}/>
    </button>
  </div>
}

function PowerRollBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={'Power Roll'}/>
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <EditCharacteristicInput fieldName={'Power Roll Bonus'} fieldValues={((card.body[bodyIdx] as power_roll).characteristicBonus as characteristic[])} onChange={(e) => {
        const tempBody = [...card.body];
        (tempBody[bodyIdx] as power_roll).characteristicBonus = e.sort((a, b) => all_characteristics.indexOf(a) - all_characteristics.indexOf(b));
        setCard({...card, body: tempBody})
      }}/>
    </div>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t1} tierNum={1}/>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t2} tierNum={2}/>
    <PowerRollTierBodyEditor card={card} setCard={setCard} bodyIdx={bodyIdx} tier={(card.body[bodyIdx] as power_roll).t3} tierNum={3}/>
  </>
}

function PowerRollTierBodyEditor({tier, tierNum, card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number, tier: power_roll_tier, tierNum: number}) {
  return (<>
    <div className={`col-span-full grid grid-cols-subgrid gap-y-2 gap-x-0`}>
      <div className={`col-span-1 border-r-[2pt] ${borderColorStyle[abilityTypeValues[tierNum - 1]]} text-lg font-bold flex justify-end items-center ${actionTextColorStyle[abilityTypeValues[tierNum - 1]]} p-2 w-full`}>
        {tierNum === 1 ? '≤11' : tierNum === 2 ? '12-16' : '17+'}
      </div>
      <div className={`col-span-3 grid grid-cols-[2pt_min-content_min-content_1fr_min-content] auto-cols-min gap-x-2 gap-y-1 ${actionBg20ColorStyle[abilityTypeValues[tierNum - 1]]} p-2`}>
        <div key={'DamageSegment'} className={`col-span-full grid grid-cols-subgrid gap-x-2 gap-y-1`}>
          <div className={`col-span-full flex justify-start items-center gap-x-2 gap-y-1`}>
            <div className={`font-bold text-right`}>Deals damage:</div>
            <input type={'checkbox'} checked={tier.damage !== undefined} onChange={(e) => {

            }} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
          </div>
          {tier.damage && <>
            <div className={`col-start-1 col-span-1 row-span-2 ${actionBg40ColorStyle[abilityTypeValues[tierNum - 1]]} w-full`}/>
            <div className={`flex justify-end items-center`}>
              <div className={`text-right w-[80pt]`}>Base damage:</div>
            </div>
            <input value={tier.damage?.baseValue} type={"number"} onChange={(e) => {
            }} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`}></input>
            <div className={`flex justify-end items-center`}>
              <div className={`text-right w-[140pt] line-clamp-1`}>including a kit bonus of:</div>
            </div>
            <input value={tier.damage?.includedKitValue} type={"number"} onChange={(e) => {
            }} className={`border-2 border-stone-400 p-1 w-[40pt] flex-none text-center`}></input>
            <div className={`col-start-2 col-span-4 grid grid-cols-2 gap-x-2 gap-y-1`}>
              <EditCharacteristicInput isBold={false} fieldName={'Characteristic Bonus Options'} fieldValues={tier.damage?.characteristicBonusOptions} onChange={(e) => {}}/>
              <EditTextInput isBold={false} fieldName={'Other bonuses'} fieldValue={tier.damage?.otherBonus} onChange={(e) => {}}/>
            </div>
          </>}
        </div>
        <div key={'BaseEffectSegment'} className={`col-span-full flex justify-start items-center gap-x-2 gap-y-1`}>
          <div className={`font-bold text-right`}>Effect text:</div>
          <input value={tier.baseEffect} onChange={(e) => {

          }} className={`flex-grow border-2 border-stone-400 p-1`}></input>
        </div>
        <div key={'PotencySegment'} className={`col-span-full grid grid-cols-subgrid gap-x-2 gap-y-1`}>
          <div className={`col-span-full flex justify-start items-center gap-x-2 gap-y-1`}>
            <div className={`font-bold text-right`}>Has potency effect:</div>
            <input type={'checkbox'} checked={tier.potency !== undefined} onChange={(e) => {

            }} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
          </div>
          {tier.potency && <>
            <div className={`col-start-1 col-span-1 row-span-2 ${actionBg40ColorStyle[abilityTypeValues[tierNum - 1]]} w-full`}/>
            <div className={`col-span-4 flex items-center gap-x-2 gap-y-1`}>
              <div className={``}>If</div>
              <select value={tier.potency?.characteristic} className={`border-2 border-stone-400 p-1`}>
                <option value={undefined}>-</option>
                {all_characteristics.map(x => <option>{x}</option>)}
              </select>
              <div className={``}>is less than</div>
              <select value={tier.potency?.strength} className={`border-2 border-stone-400 p-1`}>
                <option value={undefined}>-</option>
                <option value={0}>Weak</option>
                <option value={1}>Average</option>
                <option value={2}>Strong</option>
              </select>
            </div>
            <div className={`col-span-4 flex items-center gap-2`}>
              <div className={`text-right`}>Potency effect:</div>
              <input value={tier.potency?.effect} onChange={(e) => {

              }} className={`flex-grow border-2 border-stone-400 p-1`}></input>
            </div>
          </>}
        </div>
        {/*<input value={v.includedKitValue} type={"number"} onChange={(e) => {*/}
        {/*  const temp = [...card.header.distance.values]*/}
        {/*  temp[i].includedKitValue = parseInt(e.target.value);*/}
        {/*  onChange({...card, header: {...card.header, distance: {...card.header.distance, values: temp}}})*/}
        {/*}} className={`border-2 border-stone-400 p-1 w-full flex-none text-center`}></input>*/}
      </div>
      </div>
  </>);
}


function EffectBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={(card.body[bodyIdx] as effect).title}/>
    <EditTextInput fieldName={'Title'} fieldValue={(card.body[bodyIdx] as effect).title} onChange={(e) => {
      const temp = [...card.body]
      temp[bodyIdx] = {...temp[bodyIdx] as effect, title: e.target.value};
      setCard({...card, body: temp})
    }}/>
    <EditTextAreaInput fieldName={'Body'} fieldValue={(card.body[bodyIdx] as effect).body} onChange={(e) => {
      const temp = [...card.body]
      temp[bodyIdx] = {...temp[bodyIdx] as effect, body: (e.target as HTMLTextAreaElement).value};
      setCard({...card, body: temp})
    }}/>
  </>
}

function SpacerBodyEditor({card, setCard, bodyIdx} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number}) {
  return <>
    <BodyEditorTopbar card={card} setCard={setCard} bodyIdx={bodyIdx} type={'Spacer'}/>
    <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
      <div className={`flex justify-end items-center w-full`}>
        <div className={`font-bold text-right flex-grow`}>Size (pt):</div>
      </div>
      <input value={(card.body[bodyIdx] as spacer).sizePt} onChange={(e) => {
        const l = parseInt(e.target.value);
        const ll = l ? l : (l === 0 ? 0 : undefined);
        const temp = [...card.body]
        temp[bodyIdx] = {...temp[bodyIdx] as spacer, sizePt: ll ?? 0};
        setCard({...card, body: temp})
      }} type={"number"} min={1} max={10} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
    </div>
  </>
}

function AddToBodyButtons({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return <div className={`col-span-full divide-x divide-black w-full min-h-[24pt] overflow-hidden bg-stone-400 border-2 border-stone-600 rounded-lg flex`}>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {}}>
      <div>Add Power Roll</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isEffect: true, title: 'Trigger', body: 'When...'}]})
    }}>
      <div>Add Trigger</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isEffect: true, title: 'Effect', body: 'Some effect'}]})
    }}>
      <div>Add Effect</div>
    </div>
    <div role={`button`} className={`basis-1/4 bg-zinc-100 hover:bg-white flex justify-center items-center`} onClick={() => {
      setCard({...card, body: [...card.body, {isSpacer: true, sizePt: 5}]})
    }}>
      <div>Add Spacer</div>
    </div>
  </div>
}

function EditorUI({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  return (<>
    <div className={`grid auto-cols-min auto-rows-min grid-cols-4 w-full gap-2`}>
      <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
        <div className={`flex justify-end items-center w-full`}>
          <div className={`font-bold text-right`}>Level:</div>
        </div>
        <div className={`col-span-3 flex gap-2`}>
          <input value={card.level} onChange={(e) => {
            const l = parseInt(e.target.value);
            const ll = l ? l : (l === 0 ? 0 : undefined);
            setCard({...card, level: ll ?? 1})
          }} type={"number"} min={1} max={10} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
          <div className={`w-[40pt] flex-none`}/>
          <div className={`flex justify-end items-center flex-shrink`}>
            <div className={`font-bold text-right`}>Type:</div>
          </div>
          <select
            value={card.type}
            onInput={(e) => {
              setCard({...card, type: (e.target as HTMLSelectElement).value})
            }}
            className={`border-2 border-stone-400 p-1 flex-grow`}>
            {abilityTypeValues.map(t => (<option>{t}</option>))}
          </select>
        </div>
      </div>
      <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
        <div className={`flex justify-end items-center w-full py-1.5`}>
          <div className={`font-bold text-right`}>HR Cost:</div>
        </div>
        <div className={`col-span-3 flex justify-start items-center w-full gap-2`}>
          <input type={"checkbox"} checked={card.cost !== undefined} onInput={() => {
            if (card.cost) {
              setCard({...card, cost: undefined})
            } else {
              setCard({...card, cost: {costName: '', costValue: ''}})
            }
          }} className={`border-2 border-stone-400 p-1 flex-none`}/>
          {card.cost && <>
            <div className={`flex justify-end items-center flex-shrink`}>
              <div className={`font-bold text-right border-l-2 border-stone-400 pl-2`}>Value:</div>
            </div>
            <input value={card.cost.costValue} onChange={(e) => {
              setCard({...card, cost: {costName: card.cost?.costName || '', costValue: e.target.value}})
            }} className={`border-2 border-stone-400 p-1 text-center w-[40pt] flex-none`}></input>
            <div className={`flex justify-end items-center`}>
              <div className={`font-bold text-right`}>Name:</div>
            </div>
            <input value={card.cost.costName} onChange={(e) => {
              setCard({...card, cost: {costName: e.target.value, costValue: card.cost?.costValue || ''}})
            }} className={`border-2 border-stone-400 p-1 flex-grow`}></input>
          </>}
        </div>
      </div>
      <div className={`col-span-full flex gap-2 items-center`}>
        <span className={`text-xs small-caps font-bold pb-1`}>Header</span>
        <hr className={`w-full border-gray-300`}/>
      </div>
      <EditTextInput fieldName={'Top Text'} fieldValue={card.header.topMatter} onChange={(e) => {
        setCard({...card, header: {...card.header, topMatter: e.target.value}})
      }}/>
      <EditTextInput fieldName={'Card Name'} fieldValue={card.header.title} onChange={(e) => {
        setCard({...card, header: {...card.header, title: e.target.value}})
      }}/>
      <EditTextAreaInput fieldName={'Flavour Text'} fieldValue={card.header.flavour} onChange={(e) => setCard({
        ...card,
        header: {...card.header, flavour: (e.target as HTMLTextAreaElement).value},
      })}/>
      <EditKeywordsInput fieldName={'Keywords'} fieldValues={card.header.keywords} onChange={(ks) => setCard({
        ...card,
        header: {...card.header, keywords: ks},
      })}/>
      <EditTextInput fieldName={'Target'} fieldValue={card.header.target} onChange={(e) => {
        setCard({...card, header: {...card.header, target: e.target.value}})
      }}/>
      <EditDistance card={card} onChange={setCard}/>
      <div className={`col-span-full flex gap-2 items-center`}>
        <span className={`text-xs small-caps font-bold pb-1`}>Body</span>
        <hr className={`w-full border-gray-300`}/>
      </div>
      {card.body.map((v, i) => {
        if ((v as effect).isEffect) {
          return <EffectBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
        }
        if ((v as spacer).isSpacer) {
          return <SpacerBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
        }
        if ((v as power_roll).isPowerRoll) {
          return <PowerRollBodyEditor card={card} setCard={setCard} key={`${i}`} bodyIdx={i}/>
        }
      })}
      <AddToBodyButtons card={card} setCard={setCard}/>
    </div>
  </>);
}

export default function CardEditor({card, setCard} : {card: Card, setCard: Dispatch<Card>}) {
  const [useTextEditor, setUseTextEditor] = useState(false);

  return (
    <div className={`h-full w-full overflow-y-scroll scrollbar border-t border-t-gray-300 flex flex-col gap-[10pt]`}>
      <EditorTypeSwitch useTextEditor={useTextEditor} setUseTextEditor={setUseTextEditor}/>
      {useTextEditor ?
        <TextEditor card={card} cardNum={1} updateCard={(_, c) => setCard(c)}/> :
        <EditorUI card={asNewCard(card)} setCard={setCard}/>
      }
    </div>
  );
}
