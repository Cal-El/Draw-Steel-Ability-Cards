import {
    ability_card,
    abilityTypeValues,
    cardbackColorStyle, key_value_statement, power_roll_statement, spacer_statement,
    supportedAbilityTargets
} from "../../../types/ability-card-types.ts";
import {useState} from "react";

export function UIEditor({card, cardNum, updateCard}: {card: ability_card, cardNum: number, updateCard: (index: number, card: ability_card) => void}) {
    const [selectedStatement, setSelectedStatement] = useState("Power Roll");

    return (
        <div className={`flex flex-col gap-[5pt] h-[440pt] overflow-auto rounded-lg bg-zinc-400 p-[10pt]`}>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Type:</div>
                <select
                    value={card.type}
                    onInput={(e) => {
                        updateCard(cardNum, {...card, type: (e.target as HTMLSelectElement).value})
                    }}
                    className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                    {abilityTypeValues.map(t => (<option>{t}</option>))}
                </select>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Top Matter:</div>
                <input type='text'
                          value={card.topMatter}
                          onInput={(e) => {
                              updateCard(cardNum, {...card, topMatter: (e.target as HTMLInputElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </input>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Title:</div>
                <input type='text'
                          value={card.title}
                          onInput={(e) => updateCard(cardNum, {...card, title: (e.target as HTMLInputElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </input>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Flavour:</div>
                <textarea rows={2}
                          value={card.flavour}
                          onInput={(e) => updateCard(cardNum, {...card, flavour: (e.target as HTMLTextAreaElement).value})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Write your thoughts here...">
                </textarea>
            </div>
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Keywords:</div>
                <input type='text'
                          value={card.keywords.join(', ')}
                          onInput={(e) => updateCard(cardNum, {...card, keywords: (e.target as HTMLInputElement).value.split(', ').map(s => s.trim()).filter(x => x)})}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                          placeholder="Attack, Melee, Weapon">
                </input>
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
                    <input type='text'
                              value={card.cost?.costValue}
                              onInput={(e) => {
                                  updateCard(cardNum, {...card, cost: {costName: card.cost?.costName||'', costValue: (e.target as HTMLInputElement).value}})
                              }}
                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                              placeholder="11">
                    </input>
                    <div className={'font-body w-[80pt] text-right'}>Cost Name:</div>
                    <input type='text'
                              value={card.cost?.costName}
                              onInput={(e) => updateCard(cardNum, {...card, cost: {costName: (e.target as HTMLInputElement).value, costValue: card.cost?.costValue||''}})}
                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                              placeholder="Drama">
                    </input>
                </div>
            }
            <div className={`flex items-center gap-[5pt]`}>
                <div className={'font-body w-[80pt] text-right'}>Target:</div>
                <select value={card.target}
                          onInput={(e) => {
                              updateCard(cardNum, {...card, target: (e.target as HTMLSelectElement).value})
                          }}
                          className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                    {supportedAbilityTargets.map(t => (<option>{t}</option>))}
                </select>
            </div>
            <hr/>
            <div className={'font-body w-[80pt] text-left'}>Distance:</div>
            {card.distance.map((d, i) => {
                return (
                    <div className={`flex items-center gap-[5pt]`}>
                        <div className={'font-body w-[80pt] text-right'}>Header:</div>
                        <select value={d.distanceHeader}
                                onInput={(e) => {
                                    var distances = card.distance
                                    distances[i].distanceHeader = (e.target as HTMLSelectElement).value
                                    updateCard(cardNum, {...card, distance: distances})
                                }}
                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                            <option>Distance</option>
                            <option>Melee</option>
                            <option>Ranged</option>
                            <option>Burst</option>
                            <option>Cube</option>
                            <option>Aura</option>
                            <option>Line</option>
                        </select>
                        <div className={'font-body w-[80pt] text-right'}>Value:</div>
                        <input type='text'
                               value={d.distanceValue}
                               onInput={(e) => {
                                   var distances = card.distance
                                   distances[i].distanceValue = (e.target as HTMLInputElement).value
                                   updateCard(cardNum, {...card, distance: distances})
                               }}
                               className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                        </input>
                        <button
                            onClick={() => {
                                const distances = [...card.distance]
                                distances.splice(i, 1)
                                updateCard(cardNum, {...card, distance: distances})
                            }}
                            className={`block w-[24pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                            x
                        </button>
                    </div>
                );
            })}
            <div className={`flex items-right gap-[5pt]`}>
                <button
                    onClick={() => {
                        const distances = [...card.distance, {distanceHeader: 'Melee', distanceValue: '1'}]
                        updateCard(cardNum, {...card, distance: distances})
                    }}
                    className={`block w-[24pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                    +
                </button>
            </div>
            <hr/>
            <div className={'font-body w-[120pt] text-left'}>Card Body:</div>
            {card.statements.map((b, i) => {
                if ((b as power_roll_statement).characteristic !== undefined) {
                    return(<>
                        <hr/>
                        <div className={`flex items-center gap-[5pt]`}>
                            <div className={`flex flex-col h-full w-[32pt] justify-start items-center gap-[5pt]`}>
                                {i !== 0 ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i-1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    ^
                                </button> : <></>}
                                <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        statements.splice(i, 1)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    x
                                </button>
                                {i+1 < card.statements.length ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i+1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    v
                                </button> : <></>}
                            </div>
                            <div className={`flex-auto`}>
                                <div className={'font-body w-[120pt] text-left'}>Power Roll:</div>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Characteristic Bonus:</div>
                                    <input type='text'
                                           value={(b as power_roll_statement).characteristic}
                                           onInput={(e) => {
                                               const bs = [...card.statements];
                                               (bs[i] as power_roll_statement).characteristic = (e.target as HTMLInputElement).value;
                                               updateCard(cardNum, {...card, statements: bs})
                                           }}
                                           className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                           placeholder="Reason">
                                    </input>
                                </div>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Tier 1:</div>
                                </div>
                                <>
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Damage:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t1.hasDamage = !(bs[i] as power_roll_statement).t1.hasDamage;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t1.hasDamage && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t1.hasDamage ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Damage Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t1.damageValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t1.damageValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='2+m'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Base Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t1.hasGeneralEffect = !(bs[i] as power_roll_statement).t1.hasGeneralEffect;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t1.hasGeneralEffect && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t1.hasGeneralEffect ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Base Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t1.generalEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t1.generalEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Potency Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t1.hasPotency = !(bs[i] as power_roll_statement).t1.hasPotency;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t1.hasPotency && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t1.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t1.potencyValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t1.potencyValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='m<1'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    {(card.statements[i] as power_roll_statement).t1.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t1.potencyEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t1.potencyEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                </>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Tier 2:</div>
                                </div>
                                <>
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Damage:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t2.hasDamage = !(bs[i] as power_roll_statement).t2.hasDamage;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t2.hasDamage && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t2.hasDamage ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Damage Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t2.damageValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t2.damageValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='2+m'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Base Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t2.hasGeneralEffect = !(bs[i] as power_roll_statement).t2.hasGeneralEffect;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t2.hasGeneralEffect && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t2.hasGeneralEffect ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Base Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t2.generalEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t2.generalEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Potency Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t2.hasPotency = !(bs[i] as power_roll_statement).t2.hasPotency;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t2.hasPotency && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t2.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t2.potencyValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t2.potencyValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='m<1'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    {(card.statements[i] as power_roll_statement).t2.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t2.potencyEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t2.potencyEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                </>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Tier 3:</div>
                                </div>
                                <>
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Damage:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t3.hasDamage = !(bs[i] as power_roll_statement).t3.hasDamage;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t3.hasDamage && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t3.hasDamage ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Damage Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t3.damageValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t3.damageValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='2+m'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Base Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t3.hasGeneralEffect = !(bs[i] as power_roll_statement).t3.hasGeneralEffect;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t3.hasGeneralEffect && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t3.hasGeneralEffect ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Base Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t3.generalEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t3.generalEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                    <div className={`flex items-center gap-[5pt]`}>
                                        <div className={`w-[60pt]`}></div>
                                        <div className={'font-body w-[80pt] text-left'}>Has Potency Effect:</div>
                                        <div role={'button'} onClick={() => {
                                            const bs = [...card.statements];
                                            (bs[i] as power_roll_statement).t3.hasPotency = !(bs[i] as power_roll_statement).t3.hasPotency;
                                            updateCard(cardNum, {...card, statements: bs})
                                        }} className={`flex h-[10pt] w-[10pt] ${cardbackColorStyle['Action']} justify-center items-center`}>
                                            <div className={`text-center font-bold`}>{(card.statements[i] as power_roll_statement).t3.hasPotency && 'X'}</div>
                                        </div>
                                    </div>
                                    {(card.statements[i] as power_roll_statement).t3.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Value:</div>
                                            <input
                                                type='text'
                                                value={(card.statements[i] as power_roll_statement).t3.potencyValue}
                                                onInput={(e) => {
                                                    const bs = [...card.statements];
                                                    (bs[i] as power_roll_statement).t3.potencyValue = (e.target as HTMLInputElement).value;
                                                    updateCard(cardNum, {...card, statements: bs})
                                                }}
                                                placeholder='m<1'
                                                className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                                            </input>
                                        </div>
                                        : <></>}
                                    {(card.statements[i] as power_roll_statement).t3.hasPotency ?
                                        <div className={`flex items-center gap-[5pt]`}>
                                            <div className={`w-[60pt]`}></div>
                                            <div className={'font-body w-[80pt] text-left'}>Potency Effect:</div>
                                            <textarea rows={2}
                                                      value={(b as power_roll_statement).t3.potencyEffect}
                                                      onInput={(e) => {
                                                          const bs = [...card.statements];
                                                          (b as power_roll_statement).t3.potencyEffect = (e.target as HTMLTextAreaElement).value;
                                                          updateCard(cardNum, {...card, statements: bs})
                                                      }}
                                                      className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                                      placeholder="Write your thoughts here...">
                                        </textarea>
                                        </div>
                                        : <></>}
                                </>
                            </div>
                        </div>
                        <hr/>
                    </>);
                } else if ((b as key_value_statement).key !== undefined) {
                    return(<>
                        <hr/>
                        <div className={`flex items-center gap-[5pt]`}>
                            <div className={`flex flex-col h-full w-[32pt] justify-start items-center gap-[5pt]`}>
                                {i !== 0 ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i-1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    ^
                                </button> : <></>}
                                <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        statements.splice(i, 1)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    x
                                </button>
                                {i+1 < card.statements.length ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i+1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    v
                                </button> : <></>}
                            </div>
                            <div className={`flex-auto`}>
                                <div className={'font-body w-[120pt] text-left'}>Key-Value Block:</div>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Key:</div>
                                    <input type='text'
                                           value={(b as key_value_statement).key}
                                           onInput={(e) => {
                                               const bs = [...card.statements];
                                               (bs[i] as key_value_statement).key = (e.target as HTMLInputElement).value;
                                               updateCard(cardNum, {...card, statements: bs})
                                           }}
                                           className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                           placeholder="Effect">
                                    </input>
                                </div>
                                <div className={`flex items-center gap-[5pt]`}>
                                    <div className={'font-body w-[80pt] text-right'}>Value:</div>
                                    <textarea rows={2}
                                              value={(b as key_value_statement).value}
                                              onInput={(e) => {
                                                  const bs = [...card.statements];
                                                  (bs[i] as key_value_statement).value = (e.target as HTMLTextAreaElement).value;
                                                  updateCard(cardNum, {...card, statements: bs})
                                              }}
                                              className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}
                                              placeholder="Write your thoughts here...">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </>);
                } else if ((b as spacer_statement).spacePt !== undefined) {
                    return (<>
                        <hr/>
                        <div className={`flex items-center gap-[5pt]`}>
                            <div className={`flex flex-col h-full w-[32pt] justify-start items-center gap-[5pt]`}>
                                {i !== 0 ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i-1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    ^
                                </button> : <></>}
                                <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        statements.splice(i, 1)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    x
                                </button>
                                {i+1 < card.statements.length ? <button
                                    onClick={() => {
                                        const statements = [...card.statements]
                                        const thisStatement = statements[i]
                                        statements.splice(i, 1)
                                        statements.splice(i+1, 0, thisStatement)
                                        updateCard(cardNum, {...card, statements: statements})
                                    }}
                                    className={`block h-[32pt] w-[32pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-none`}>
                                    v
                                </button> : <></>}
                            </div>
                            <div className={`flex-auto`}>
                                <div className={'font-body w-[120pt] text-left'}>Spacer Block</div>
                            </div>
                        </div>
                        <hr/>
                    </>);
                }
                return (<></>);
            })}
            <div className={`flex items-right gap-[5pt]`}>
                <select
                    value={selectedStatement}
                    onInput={(e) => {
                        setSelectedStatement((e.target as HTMLSelectElement).value);
                    }}
                    className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                    <option>Power Roll</option>
                    <option>Key-Value Block</option>
                    <option>Spacer</option>
                </select>
                <button
                    onClick={() => {
                        switch (selectedStatement) {
                            case "Power Roll":
                                const statements = [...card.statements, {
                                    characteristic: "Might or Agility",
                                    t1: {
                                        hasDamage: true,
                                        damageValue: 'x',
                                        hasGeneralEffect: true,
                                        generalEffect: '2 + M or A damage',
                                        hasPotency: false,
                                    },
                                    t2: {
                                        hasDamage: true,
                                        damageValue: 'x',
                                        hasGeneralEffect: true,
                                        generalEffect: '5 + M or A damage',
                                        hasPotency: false,
                                    },
                                    t3: {
                                        hasDamage: true,
                                        damageValue: 'x',
                                        hasGeneralEffect: true,
                                        generalEffect: '7 + M or A damage',
                                        hasPotency: false,
                                    },
                                }];
                                updateCard(cardNum, {...card, statements: statements});
                                break;
                            case "Key-Value Block":
                                const statementz = [...card.statements, {
                                    key: "Effect",
                                    value: "Prone",
                                }];
                                updateCard(cardNum, {...card, statements: statementz});
                                break;
                            case "Spacer":
                                const statementx = [...card.statements, {
                                    spacePt: 5,
                                }];
                                updateCard(cardNum, {...card, statements: statementx});
                                break;
                        }

                    }}
                    className={`block w-[24pt] p-2.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg font-mono flex-auto`}>
                    +
                </button>
            </div>
        </div>
    );
}