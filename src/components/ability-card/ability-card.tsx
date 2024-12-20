import { AutoTextSize } from "auto-text-size";
import {
    ability_card,
    actionBg100ColorStyle, actionBg20ColorStyle, actionBg30ColorStyle, actionBg40ColorStyle,
    actionBg50ColorStyle,
    actionTextColorStyle, cardbackColorStyle, distance_block, key_value_statement,
    power_roll_statement, power_roll_tier, spacer_statement
} from "./ability-card-types.ts";
import {useState} from "react";
import { parse as yamlParse, stringify as yamlStringify } from "yaml";

function powerRollStatement(card: ability_card, powerRoll: power_roll_statement) {
    return (
        <div className={`flex-auto flex flex-col h-[110.7pt] justify-center gap-y-[3pt]`}>
            <div className={`flex`}>
                <div className={`w-[3pt]`}></div>
                <p className={`text-[13.5pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>Power Roll + {powerRoll.characteristic}:</b></p>
            </div>
            <div className={`flex flex-col w-full h-[97.2pt]`}>
                {powerRollLine(card, powerRoll.t1, 1)}
                {powerRollLine(card, powerRoll.t2, 2)}
                {powerRollLine(card, powerRoll.t3, 3)}
            </div>
        </div>
    )
}

function powerRollLine(card: ability_card, powerRollTier: power_roll_tier, rowNum: number) {
    return <div className={`flex w-full`}>
        <div className={`${actionBg100ColorStyle[card.type]} w-[8.1pt] h-[32.4pt] flex justify-center`}>
            <div className={`[writing-mode:vertical-lr] rotate-180 text-[6pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{rowNum === 1 ? '11 or less' : rowNum === 2 ? '12-16' : '17+'}</div>
        </div>
        {powerRollTier.hasDamage ?
            <div className={`relative  ${rowNum % 2 === 1 ? actionBg50ColorStyle[card.type] : actionBg40ColorStyle[card.type]} w-[32.4pt] h-[32.4pt]`}>
                <div className={`absolute top-0 left-0 text-[6.75pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Damage</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[18pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.damageValue}</div>
                </div>
            </div>: <></>
        }
        {powerRollTier.hasGeneralEffect ?
            <div className={`${rowNum % 2 === 1 ? actionBg20ColorStyle[card.type] : actionBg30ColorStyle[card.type]} flex-1 flex h-[32.4pt]`}>
                <div className={`h-[32.4pt] w-[4.5pt]`}>
                </div>
                <div className={`h-[32.4pt] flex-1 flex flex-col justify-center`}>
                    <div className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRollTier.generalEffect}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`relative  ${rowNum % 2 === 1 ? actionBg40ColorStyle[card.type] : actionBg50ColorStyle[card.type]} w-[32.4pt] h-[32.4pt]`}>
                <div className={`absolute top-0 left-0 text-[6.75pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Potency</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[18pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRollTier.potencyValue}</div>
                </div>
            </div> : <></>
        }
        {powerRollTier.hasPotency ?
            <div className={`${rowNum % 2 === 1 ? actionBg20ColorStyle[card.type] : actionBg30ColorStyle[card.type]} flex-1 flex h-[32.4pt]`}>
                <div className={`h-[32.4pt] w-[4.5pt]`}>
                </div>
                <div className={`h-[32.4pt] flex-1 flex flex-col justify-center`}>
                    <div className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRollTier.potencyEffect}</div>
                </div>
            </div> : <></>
        }
    </div>
}

function blockStatement(card: ability_card, kv: key_value_statement) {
    if (kv.key === "Trigger") {
        return (
            <div className={`flex-auto flex ${actionBg20ColorStyle[card.type]} py-[4.5pt]`}>
                <div className={`w-[3pt] flex-none`}></div>
                <p className={`text-[13.5pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>Trigger:</b> {kv.value}</p>
            </div>
        )
    }
    return (
        <div className={`flex-auto flex`}>
            <div className={`w-[3pt] flex-none`}></div>
            <p className={`text-[13.5pt] font-body ${actionTextColorStyle[card.type]} leading-none whitespace-pre-line`}><b>{kv.key}:</b> {kv.value}</p>
        </div>
    )
}

function spacerStatement() {
    return (<div className={`h-[7.5pt]`}></div>)
}

function hasPowerRollStatement(card: ability_card) {
    for (let i = 0; i < card.statements.length; i++) {
        if ((card.statements[i] as power_roll_statement).characteristic !== undefined) {
            return true;
        }
    }
    return false;
}

function costBlock(card: ability_card) {
    if (!card.hasCost) {
        return (<></>);
    }
    return (
        <div className={`w-[81pt] h-[24pt] ${actionBg100ColorStyle[card.type]} absolute right-0 top-0 flex flex-col justify-center rounded-tr-[7.5pt] rounded-bl-[6pt]`}>
            <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{card.cost?.costValue} {card.cost?.costName}</div>
        </div>
    );
}

function targetBlock(card: ability_card) {
    if (card.target === '1 Creature or Object') {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full  pt-[5pt]`}>
                    <div
                        className={`text-[24pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>1
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-[5pt] small-caps text-center`}>Creature
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>or
                        Object
                    </div>
                </div>
            </div>
        )
    } else if (card.target === '1 Creature') {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[2pt]`}>
                    <div
                        className={`text-[24pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>1
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creature
                    </div>
                </div>
            </div>
        )
    } else if (card.target === 'Self and All Creatures') {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full pt-[7pt]`}>
                    <div
                        className={`text-[16.5pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>Self
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>and All
                    </div>
                    <div
                        className={`text-[7.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creatures
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[16.5pt] font-body font-bold text-cardback leading-[18pt] small-caps text-center`}>{card.target}
                    </div>
                </div>
            </div>
        )
    }
}

function distanceBlock(card: ability_card, block: distance_block) {
    if (block.distanceValue.length === 1 || block.distanceValue.length === 2) {
        return (
            <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
                <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[24pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
                </div>
            </div>
        )
    }
    return (
        <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[42pt] h-[42pt]`}>
            <div className={`absolute top-0 left-0 text-[9pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.6pt]`}>{block.distanceHeader}</div>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                <div className={`text-[16.5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
            </div>
        </div>
    )
}

function cardContainer(card: ability_card, selectionState: number) {
    return (
        <div className={`cardContainer flex h-[270pt] w-[378pt] rounded-[13.5pt] border-[3pt] ${cardbackColorStyle[card.type]} ${selectionState > 0 ? 'scale-[1.2]' : selectionState < 0 ? 'scale-[0.8]' : 'scale-[1]'}`}>
            <div className={`w-[331.5pt]`}>
                <div className={`flex`}>
                    <div className={`w-[3pt]`}></div>
                    <div className={`w-[325.5pt]`}>
                        <div className={`h-[3pt]`}/>
                        <h2 className={`w-[285.5pt] text-[15pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-none indent-[2.4pt]`}><AutoTextSize maxFontSizePx={20}>{card.source} {card.type}</AutoTextSize></h2>
                        <h1 className={`text-[24pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-[19.5pt]`}><AutoTextSize maxFontSizePx={32}>{card.title}</AutoTextSize></h1>
                        <div className={`flex w-[325.5pt] gap-x-[2.85pt]`}>
                            {card.keywords.map((k) => (
                                <div className={`flex h-[15.75pt] w-[54.75pt] pt-[2pt] pr-[2pt] pl-[2pt] bg-keyword-backing items-center`}>
                                    <h3 className={`text-[13.5pt] w-full font-display small-caps text-cardback text-center flex justify-center`}><AutoTextSize maxFontSizePx={18}>{k}</AutoTextSize></h3>
                                </div>
                            ))}
                        </div>
                        <div className={`h-[1pt]`}></div>
                        <div className={`h-[30pt]`}>
                            <p className={`text-[13.5pt] h-full font-body italic font-light ${actionTextColorStyle[card.type]} leading-none`}><AutoTextSize mode="box" maxFontSizePx={26}>{card.flavour}</AutoTextSize></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex flex-col h-[182pt] ${hasPowerRollStatement(card) ? 'justify-center' : ''} gap-y-[3pt]`}>
                        {card.statements.map(s => {
                            if ((s as key_value_statement).key !== undefined) {
                                return blockStatement(card, s as key_value_statement);
                            } else if ((s as power_roll_statement).characteristic !== undefined) {
                                return powerRollStatement(card, s as power_roll_statement);
                            } else if ((s as spacer_statement).spacePt !== undefined) {
                                return spacerStatement();
                            } else {
                                return (<></>)
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className={`relative w-[42pt]`}>
                {costBlock(card)}
                <div className={`flex flex-col items-right absolute right-0 top-[24pt]`}>
                    {targetBlock(card)}
                    {card.distance.map(b => distanceBlock(card, b))}
                </div>
            </div>
        </div>
    );
}

function tryParseCardInputJson(s: string, setCardState: React.Dispatch<React.SetStateAction<ability_card>>, setInputBoxValue: React.Dispatch<React.SetStateAction<string>>, setErrorMsg: React.Dispatch<React.SetStateAction<string>>) {
    setInputBoxValue(s);
    let abilityCard: ability_card
    try {
        abilityCard = JSON.parse(s);
    } catch(e) {
        try {
            abilityCard = yamlParse(s) as ability_card
        } catch (e2) {
            setErrorMsg('invalid JSON');
            return false;
        }
    }
    const result = checkAbilityCard(abilityCard);
    setErrorMsg(result);
    if (result !== '') {
        console.log(result);
        return false;
    }
    setCardState(abilityCard);
    return true;
}

function checkAbilityCard(abilityCard: ability_card) : string {
    if (abilityCard.type === undefined || abilityCard.type === null) {
        return 'missing [type: string; Action|Maneuver|Triggered Action|Free Triggered Action|Free Maneuver|Routine|Passive|Free Strike Action]'
    }
    if (abilityCard.type !== 'Action' && abilityCard.type !== 'Maneuver' && abilityCard.type !== 'Triggered Action' && abilityCard.type !== 'Free Triggered Action' && abilityCard.type !== 'Free Maneuver' && abilityCard.type !== 'Routine' && abilityCard.type !== 'Passive' && abilityCard.type !== 'Free Strike Action') {
        return 'invalid type entry [type: string; Action|Maneuver|Triggered Action|Free Triggered Action|Free Maneuver|Routine|Passive|Free Strike Action]'
    }
    if (abilityCard.source === undefined || abilityCard.source === null) {
        return 'missing [source: string; such as "Core" or "Conduit Signature" or "Censor Heroic"]'
    }
    if (abilityCard.title === undefined || abilityCard.title === null) {
        return 'missing [title: string; such as "Healing Grace"]'
    }
    if (abilityCard.flavour === undefined || abilityCard.flavour === null) {
        return 'missing [flavour: string; such as "Healing Grace"]'
    }
    if (abilityCard.keywords === undefined || abilityCard.keywords === null || abilityCard.keywords.map === undefined) {
        return 'missing [keywords: string[]; can be empty]'
    }
    if (abilityCard.statements === undefined || abilityCard.statements === null || abilityCard.statements.map === undefined) {
        return 'missing [statements: body_statement[]; can be empty]'
    }
    if (abilityCard.hasCost === undefined || abilityCard.hasCost === null) {
        return 'missing [hasCost: boolean]'
    }
    if (abilityCard.target === undefined || abilityCard.target === null) {
        return 'missing [target: string; such as "1 creature or object"]'
    }
    if (abilityCard.distance === undefined || abilityCard.distance === null || abilityCard.distance.map === undefined) {
        return 'missing [distance: distance_block[]; can be empty]'
    }
    for (let i = 0; i < abilityCard.statements.length; i++) {
        if ((abilityCard.statements[i] as power_roll_statement).characteristic !== undefined) {
            if ((abilityCard.statements[i] as power_roll_statement).t1 === undefined || (abilityCard.statements[i] as power_roll_statement).t1 === null) {
                return `missing [power_roll_statement.t1: power_roll_tier] from entry [${i}]`
            }
            if ((abilityCard.statements[i] as power_roll_statement).t2 === undefined || (abilityCard.statements[i] as power_roll_statement).t2 === null) {
                return `missing [power_roll_statement.t2: power_roll_tier] from entry [${i}]`
            }
            if ((abilityCard.statements[i] as power_roll_statement).t3 === undefined || (abilityCard.statements[i] as power_roll_statement).t3 === null) {
                return `missing [power_roll_statement.t3: power_roll_tier] from entry [${i}]`
            }
        }
    }
    for (let i = 0; i < abilityCard.distance.length; i++) {
        if (abilityCard.distance[i].distanceHeader === undefined || abilityCard.distance[i].distanceHeader === null) {
            return `missing [distance.distanceHeader: string] from entry [${i}]`
        }
        if (abilityCard.distance[i].distanceValue === undefined || abilityCard.distance[i].distanceValue === null) {
            return `missing [distance.distanceValue: string] from entry [${i}]`
        }
    }
    return ''
}

export default function AbilityCard({card, cardNum, selectedCard, setSelectedCard}: {card: ability_card, cardNum: number, selectedCard: number, setSelectedCard: React.Dispatch<React.SetStateAction<number>>}) {
    const [isValidInput, setIsValidInput] = useState(false);
    const [cardState, setCardState] = useState(card);
    const [inputBoxValue, setInputBoxValue] = useState(yamlStringify(card, null, 2));
    const [errorMsg, setErrorMsg] = useState('');

    let selectedCardState = (selectedCard===cardNum ? 1 : selectedCard===-1 ? 0 : -1)

    return (
        <div className={`flex flex-wrap justify-center items-center ${selectedCardState > 0 ? 'w-screen' : ''}`} key={cardNum}>
            <div className={`flex flex-col`}>
                <div id="abilitycard" role="button" onClick={() => {
                    if (selectedCardState > 0) {
                        setSelectedCard(-1)
                    } else {
                        setSelectedCard(cardNum)
                    }
                }} className={`flex-none flex justify-center items-center ${selectedCardState > 0 ? 'h-[324pt] w-[453.6pt]' : selectedCardState < 0 ? 'h-[216pt] w-[302.4pt]' : 'h-[270pt] w-[378pt]'}`}>
                    {cardContainer(cardState, selectedCardState)}
                </div>
                {selectedCardState > 0 ? (<div role='button' onClick={() => {
                    // remove card
                }} className={`flex h-[40pt] w-[453.6pt] rounded-[13.5pt] border border-[3pt] ${cardbackColorStyle[`Triggered Action`]} justify-center items-center`}>
                    <div className={`text-[16pt] text-center ${actionTextColorStyle[`Triggered Action`]} font-bold`}>Remove Card</div>
                </div>) : (<></>)}
            </div>
            {selectedCardState > 0 ? (<div className={`flex-none h-[504pt] w-[378pt]`}>
            <textarea id="message" rows={30}
                      value={inputBoxValue}
                      onInput={(e) => setIsValidInput(tryParseCardInputJson((e.target as HTMLTextAreaElement).value, setCardState, setInputBoxValue, setErrorMsg))}
                      className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg font-mono ${isValidInput ? 'caret-regal-blue' : 'caret-triggered-action'}`}
                      placeholder="Write your thoughts here...">
            </textarea>
                <p className={`text-triggered-action-card`}>{errorMsg}</p>
            </div>) : (<></>)}
        </div>
    );
}