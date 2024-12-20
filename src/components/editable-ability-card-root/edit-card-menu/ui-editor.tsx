import {ability_card, cardbackColorStyle} from "../../../types/ability-card-types.ts";
import React from "react";

export function UIEditor({card, setCardState}: {card: ability_card, setCardState: React.Dispatch<React.SetStateAction<ability_card>>}) {
    return (
        <div className={`flex flex-col gap-[5pt]`}>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Source:</div>
                <textarea rows={1}
                          value={card.source}
                          onInput={(e) => {
                              setCardState({...card, source: (e.target as HTMLTextAreaElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Title:</div>
                <textarea rows={1}
                          value={card.title}
                          onInput={(e) => setCardState({...card, title: (e.target as HTMLTextAreaElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Flavour:</div>
                <textarea rows={1}
                          value={card.flavour}
                          onInput={(e) => setCardState({...card, flavour: (e.target as HTMLTextAreaElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Type:</div>
                <textarea rows={1}
                          value={card.type}
                          onInput={(e) => {
                              setCardState({...card, type: (e.target as HTMLTextAreaElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Action">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Keywords:</div>
                <textarea rows={1}
                          value={card.keywords.join(', ')}
                          onInput={(e) => setCardState({...card, keywords: (e.target as HTMLTextAreaElement).value.split(', ').map(s => s.trim())})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Attack, Melee, Weapon">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Has HR Cost:</div>
                <div role={'button'} onClick={() => {
                    setCardState({...card, hasCost: !card.hasCost, cost: (!card.hasCost ? undefined : card.cost)})
                }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                    <div className={`text-center font-bold`}>{card.hasCost && 'X'}</div>
                </div>
            </div>
            {card.hasCost &&
                <div className={`flex items-center gap-[5pt]`}>
                    <div className={'font-body w-[80pt] text-right'}>Cost Value:</div>
                    <textarea rows={1}
                              value={card.cost?.costValue}
                              onInput={(e) => {
                                  setCardState({...card, cost: {...card?.cost, costValue: (e.target as HTMLTextAreaElement).value}})
                              }}
                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                              placeholder="11">
                    </textarea>
                    <div className={'font-body w-[80pt] text-right'}>Cost Name:</div>
                    <textarea rows={1}
                              value={card.cost?.costName}
                              onInput={(e) => setCardState({...card, cost: {...card?.cost, costName: (e.target as HTMLTextAreaElement).value}})}
                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                              placeholder="Drama">
                    </textarea>
                </div>
            }
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Target:</div>
                <textarea rows={1}
                          value={card.target}
                          onInput={(e) => {
                              setCardState({...card, target: (e.target as HTMLTextAreaElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="11">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-full text-right'}>Work in Progress... Use the Text Editor</div>
            </div>
        </div>
    );
}