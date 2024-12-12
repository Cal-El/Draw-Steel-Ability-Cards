import {
    ability_card,
    actionBg100ColorStyle, actionBg20ColorStyle, actionBg30ColorStyle, actionBg40ColorStyle,
    actionBg50ColorStyle,
    actionTextColorStyle, cardbackColorStyle, distance_block, key_value_statement,
    power_roll_statement, spacer_statement
} from "./ability-card-types.ts";


function powerRollStatement(card: ability_card, powerRoll: power_roll_statement) {
    return (
        <div className={`flex flex-col h-[73.8 pt] justify-center gap-y-[2pt]`}>
            <div className={`flex`}>
                <div className={`w-[2pt]`}></div>
                <p className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>Power Roll + {powerRoll.characteristic}:</b></p>
            </div>
            <div className={`flex flex-col w-full h-[64.8 pt]`}>
                <div className={`flex w-full`}>
                    <div className={`${actionBg100ColorStyle[card.type]} w-[5.4pt] h-[21.6pt] flex justify-center`}>
                        <div className={`[writing-mode:vertical-lr] rotate-180 text-[4pt] font-body font-bold text-cardback leading-none small-caps text-center`}>11 or less</div>
                    </div>
                    {powerRoll.t1.hasDamage ?
                        <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{powerRoll.t1.damageType}</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t1.damageValue}</div>
                            </div>
                        </div>: <></>
                    }
                    {powerRoll.t1.hasGeneralEffect ?
                        <div className={`${actionBg20ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t1.generalEffect}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t1.hasPotency ?
                        <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Potency</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t1.potencyValue}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t1.hasPotency ?
                        <div className={`${actionBg20ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t1.potencyEffect}</div>
                            </div>
                        </div> : <></>
                    }
                </div>
                <div className={`flex w-full`}>
                    <div className={`${actionBg100ColorStyle[card.type]} w-[5.4pt] h-[21.6pt] flex justify-center`}>
                        <div className={`[writing-mode:vertical-lr] rotate-180 text-[4pt] font-body font-bold text-cardback leading-none small-caps text-center`}>12-16</div>
                    </div>
                    {powerRoll.t2.hasDamage ?
                        <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{powerRoll.t2.damageType}</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t2.damageValue}</div>
                            </div>
                        </div>: <></>
                    }
                    {powerRoll.t2.hasGeneralEffect ?
                        <div className={`${actionBg30ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t2.generalEffect}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t2.hasPotency ?
                        <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Potency</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t2.potencyValue}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t2.hasPotency ?
                        <div className={`${actionBg30ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t2.potencyEffect}</div>
                            </div>
                        </div> : <></>
                    }
                </div>
                <div className={`flex w-full`}>
                    <div className={`${actionBg100ColorStyle[card.type]} w-[5.4pt] h-[21.6pt] flex justify-center`}>
                        <div className={`[writing-mode:vertical-lr] rotate-180 text-[4pt] font-body font-bold text-cardback leading-none small-caps text-center`}>17+</div>
                    </div>
                    {powerRoll.t3.hasDamage ?
                        <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{powerRoll.t3.damageType}</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t3.damageValue}</div>
                            </div>
                        </div>: <></>
                    }
                    {powerRoll.t3.hasGeneralEffect ?
                        <div className={`${actionBg20ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t3.generalEffect}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t3.hasPotency ?
                        <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[21.6pt] h-[21.6pt]`}>
                            <div className={`absolute top-0 left-0 text-[4.5pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Potency</div>
                            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                                <div className={`text-[12pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{powerRoll.t3.potencyValue}</div>
                            </div>
                        </div> : <></>
                    }
                    {powerRoll.t3.hasPotency ?
                        <div className={`${actionBg20ColorStyle[card.type]} flex-grow flex h-[21.6pt]`}>
                            <div className={`h-[21.6pt] w-[3pt]`}>
                            </div>
                            <div className={`h-[21.6pt] flex-grow flex flex-col justify-center`}>
                                <div className={`text-[6pt] font-body ${actionTextColorStyle[card.type]} leading-none text-left`}>{powerRoll.t3.potencyEffect}</div>
                            </div>
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

function blockStatement(card: ability_card, kv: key_value_statement) {
    if (kv.key === "Trigger") {
        return (
            <div className={`flex ${actionBg20ColorStyle[card.type]} py-[3pt]`}>
                <div className={`w-[2pt]`}></div>
                <p className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>Trigger:</b> {kv.value}</p>
            </div>
        )
    }
    return (
        <div className={`flex`}>
            <div className={`w-[2pt]`}></div>
            <p className={`text-[9pt] font-body ${actionTextColorStyle[card.type]} leading-none`}><b>{kv.key}:</b> {kv.value}</p>
        </div>
    )
}

function spacerStatement() {
    return (<div className={`h-[5pt]`}></div>)
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
        <div className={`w-[54pt] h-[16pt] ${actionBg100ColorStyle[card.type]} absolute right-0 top-0 flex flex-col justify-center rounded-tr-[5pt] rounded-bl-[4pt]`}>
            <div className={`text-[8pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{card.cost?.costValue} {card.cost?.costName}</div>
        </div>
    );
}

function targetBlock(card: ability_card) {
    if (card.target === '1 Creature or Object') {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[16pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>1
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>Creature
                    </div>
                    <div
                        className={`text-[5pt] font-body font-bold text-cardback leading-none small-caps text-center`}>or
                        Object
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`relative  ${actionBg40ColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div
                    className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>Target
                </div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div
                        className={`text-[11pt] font-body font-bold text-cardback leading-[12pt] small-caps text-center`}>{card.target}
                    </div>
                </div>
            </div>
        )
    }
}

function distanceBlock(card: ability_card, block: distance_block) {
    if (block.distanceValue.length === 1 || block.distanceValue.length === 2) {
        return (
            <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[28pt] h-[28pt]`}>
                <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
                <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                    <div className={`text-[16pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
                </div>
            </div>
        )
    }
    return (
        <div className={`relative  ${actionBg50ColorStyle[card.type]} w-[28pt] h-[28pt]`}>
            <div className={`absolute top-0 left-0 text-[6pt] font-body font-bold ${actionTextColorStyle[card.type]} leading-none small-caps indent-[0.4pt]`}>{block.distanceHeader}</div>
            <div className={`absolute inset-0 flex flex-col justify-center items-center w-full h-full`}>
                <div className={`text-[11pt] font-body font-bold text-cardback leading-none small-caps text-center`}>{block.distanceValue}</div>
            </div>
        </div>
    )
}

export default function AbilityCard({card}: {card: ability_card}) {
    return (
      <>
        <div className={`cardContainer flex h-[180pt] w-[252pt] rounded-[9pt] border border-[2pt] ${cardbackColorStyle[card.type]}`}>
            <div className={`w-[221pt]`}>
                <div className={`flex`}>
                    <div className={`w-[2pt]`}></div>
                    <div className={`w-[217pt]`}>
                        <div className={`h-[2pt]`}/>
                        <h2 className={`text-[10pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-none indent-[1.6pt]`}>{card.source} {card.type}</h2>
                        <h1 className={`text-[16pt] font-display font-bold small-caps ${actionTextColorStyle[card.type]} leading-[13pt]`}>{card.title}</h1>
                        <div className={`flex w-[219pt] gap-x-[1.9pt]`}>
                            {card.keywords.map((k) => (
                                <div className={`flex h-[10.5pt] w-[36.5pt] bg-keyword-backing justify-center items-center`}>
                                    <h3 className={`text-[9pt] font-display small-caps text-cardback text-center`}>{k}</h3>
                                </div>
                            ))}
                        </div>
                        <div className={`h-[20pt]`}>
                            <p  className={`text-[9pt] font-body italic font-light ${actionTextColorStyle[card.type]} leading-none`}>{card.flavour}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex flex-col h-[122pt] ${hasPowerRollStatement(card) ? 'justify-center' : ''} gap-y-[2pt]`}>
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
            <div className={`relative w-[28pt]`}>
                {costBlock(card)}
                <div className={`flex flex-col items-right absolute right-0 top-[16pt]`}>
                    {targetBlock(card)}
                    {card.distance.map(b => distanceBlock(card, b))}
                </div>
            </div>
        </div>
      </>
    );
}