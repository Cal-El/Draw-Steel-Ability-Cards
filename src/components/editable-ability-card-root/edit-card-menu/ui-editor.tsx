import {ability_card, cardbackColorStyle} from "../../../types/ability-card-types.ts";

export function UIEditor({card, cardNum, updateCard}: {card: ability_card, cardNum: number, updateCard: (index: number, card: ability_card) => void}) {
    return (
        <div className={`flex flex-col gap-[5pt]`}>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Source:</div>
                <textarea rows={1}
                          value={card.source}
                          onInput={(e) => {
                              updateCard(cardNum, {...card, source: (e.target as HTMLTextAreaElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Title:</div>
                <textarea rows={1}
                          value={card.title}
                          onInput={(e) => updateCard(cardNum, {...card, title: (e.target as HTMLTextAreaElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Flavour:</div>
                <textarea rows={1}
                          value={card.flavour}
                          onInput={(e) => updateCard(cardNum, {...card, flavour: (e.target as HTMLTextAreaElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Type:</div>
                <textarea rows={1}
                          value={card.type}
                          onInput={(e) => {
                              updateCard(cardNum, {...card, type: (e.target as HTMLTextAreaElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Action">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Keywords:</div>
                <textarea rows={1}
                          value={card.keywords.join(', ')}
                          onInput={(e) => updateCard(cardNum, {...card, keywords: (e.target as HTMLTextAreaElement).value.split(', ').map(s => s.trim())})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Attack, Melee, Weapon">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Has HR Cost:</div>
                <div role={'button'} onClick={() => {
                    updateCard(cardNum, {...card, hasCost: !card.hasCost, cost: (!card.hasCost ? undefined : card.cost)})
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
                                  updateCard(cardNum, {...card, cost: {costName: card.cost?.costName||'', costValue: (e.target as HTMLTextAreaElement).value}})
                              }}
                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                              placeholder="11">
                    </textarea>
                    <div className={'font-body w-[80pt] text-right'}>Cost Name:</div>
                    <textarea rows={1}
                              value={card.cost?.costName}
                              onInput={(e) => updateCard(cardNum, {...card, cost: {costName: (e.target as HTMLTextAreaElement).value, costValue: card.cost?.costValue||''}})}
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
                              updateCard(cardNum, {...card, target: (e.target as HTMLTextAreaElement).value})
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