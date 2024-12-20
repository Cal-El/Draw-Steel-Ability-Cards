import React, {useState} from "react";
import {parse as yamlParse, stringify as yamlStringify} from "yaml";
import {ability_card, power_roll_statement} from "../../../types/ability-card-types.ts";

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

export function TextEditor({card, setCardState}: {card: ability_card, setCardState: React.Dispatch<React.SetStateAction<ability_card>>}) {
    const [isValidInput, setIsValidInput] = useState(false);
    const [inputBoxValue, setInputBoxValue] = useState(yamlStringify(card, null, 2));
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <>
            <textarea id="message" rows={30}
                  value={inputBoxValue}
                  onInput={(e) => setIsValidInput(tryParseCardInputJson((e.target as HTMLTextAreaElement).value, setCardState, setInputBoxValue, setErrorMsg))}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg font-mono ${isValidInput ? 'caret-regal-blue' : 'caret-triggered-action'}`}
                  placeholder="Write your thoughts here...">
            </textarea>
            <p className={`text-triggered-action-card`}>{errorMsg}</p>
        </>
    );
}