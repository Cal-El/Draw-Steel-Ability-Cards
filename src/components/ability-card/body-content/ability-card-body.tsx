import {
    ability_card,
    key_value_statement,
    power_roll_statement,
    spacer_statement
} from "../../../types/ability-card-types.ts";
import {PowerRollStatement} from "./power-roll.tsx";
import {KeyValueStatement} from "./key-value-statement.tsx";

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

export function AbilityCardBody({card}: {card: ability_card}) {
    return (<div className={`flex flex-col ${card.flavour && card.keywords.length>0 ? `h-[177pt]` : card.flavour ? `h-[192pt]` : card.keywords.length>0 ? `h-[207pt]` : `h-[222pt]`} ${hasPowerRollStatement(card) ? 'justify-center' : ''} gap-y-[3pt]`}>
        {card.statements.map(s => {
            if ((s as key_value_statement).key !== undefined) {
                return KeyValueStatement({card, kv: s as key_value_statement});
            } else if ((s as power_roll_statement).characteristic !== undefined) {
                return PowerRollStatement({card: card, powerRoll: s as power_roll_statement});
            } else if ((s as spacer_statement).spacePt !== undefined) {
                return spacerStatement();
            } else {
                return (<></>)
            }
        })}
    </div>);
}