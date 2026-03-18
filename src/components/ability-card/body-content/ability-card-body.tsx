import {
    ability_card,
    key_value_statement,
    power_roll_statement,
    spacer_statement
} from "../../../types/ability-card-types.ts";
import {PowerRollStatement} from "./power-roll.tsx";
import {KeyValueStatement} from "./key-value-statement.tsx";

function SpacerStatement({s} :{s: spacer_statement}) {
    return (<div style={{height: s.spacePt+'pt'}} className={`flex-none`}></div>)
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
    return (<div className={`flex flex-col ${card.flavour && card.keywords.length>0 ? `h-[118pt]` : card.flavour ? `h-[128pt]` : card.keywords.length>0 ? `h-[138pt]` : `h-[148pt]`} ${hasPowerRollStatement(card) ? 'justify-center' : ''} gap-y-[2pt]`}>
        {card.statements.map((s, i) => {
            if ((s as key_value_statement).key !== undefined) {
                return <KeyValueStatement key={`${i}-effect`} card={card} kv={s as key_value_statement}/>
            } else if ((s as power_roll_statement).characteristic !== undefined) {
                return <PowerRollStatement key={`${i}-pr`} card={card} powerRoll={s as power_roll_statement}/>;
            } else if ((s as spacer_statement).spacePt !== undefined) {
                return <SpacerStatement key={`${i}-spacer`} s={s as spacer_statement}/>;
            } else {
                return (<></>)
            }
        })}
    </div>);
}
