import {ability_card} from "../../../types/ability-card-types.ts";
import TargetBasic from "./target-block/target-basic.tsx";
import TargetCreaturesOrObjects from "./target-block/target-creatures-or-objects.tsx";
import TargetCreatures from "./target-block/target-creatures.tsx";
import TargetSelfAndCreatures from "./target-block/target-self-and-creatures.tsx";
import TargetAllyOrEnemy from "./target-block/target-ally-or-enemy.tsx";
import TargetWillingCreatures from "./target-block/target-willing-creatures.tsx";
import { ColourSet } from "../../../types/card-settings.ts";

export function TargetBlock({card, bgColorGetter}: {card: ability_card, bgColorGetter: (t: string, s: ColourSet) => string}) {
    if (card.target === '1 Creature or Object') {
        return <TargetCreaturesOrObjects card={card} bgColorGetter={bgColorGetter} numCreatures="1"/>
    } else if (card.target === '2 Creatures or Objects') {
        return <TargetCreaturesOrObjects card={card} bgColorGetter={bgColorGetter} numCreatures="2"/>
    } else if (card.target === '3 Creatures or Objects') {
        return <TargetCreaturesOrObjects card={card} bgColorGetter={bgColorGetter} numCreatures="3"/>
    } else if (card.target === '1 Creature') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"1"} type="Creatures"/>
    } else if (card.target === '2 Creatures') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"2"} type="Creatures"/>
    } else if (card.target === '3 Creatures') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"3"} type="Creatures"/>
    } else if (card.target === 'All Creatures') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"All"} type="Creatures"/>
    } else if (card.target === '1 Ally') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"1"} type="Allies"/>
    } else if (card.target === '2 Allies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"2"} type="Allies"/>
    } else if (card.target === '3 Allies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"3"} type="Allies"/>
    } else if (card.target === 'All Allies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures={"All"} type="Allies"/>
    } else if (card.target === '1 Enemy') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="1" type="Enemies"/>
    } else if (card.target === '2 Enemies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="2" type="Enemies"/>
    } else if (card.target === '3 Enemies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="3" type="Enemies"/>
    } else if (card.target === 'All Enemies') {
        return <TargetCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="All" type="Enemies"/>
    } else if (card.target === '1 Ally or Enemy') {
        return <TargetAllyOrEnemy card={card} bgColorGetter={bgColorGetter} numCreatures="1"/>
    } else if (card.target === '1 Willing Creature') {
        return <TargetWillingCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="1"/>
    } else if (card.target === 'Self and 1 Ally') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="1" creatureType="Allies" andOr="and"/>
    } else if (card.target === 'Self or 1 Ally') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="1" creatureType="Allies" andOr="or"/>
    } else if (card.target === 'Self or 1 Creature') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="1" creatureType="Creatures" andOr="or"/>
    } else if (card.target === 'Self and 2 Allies') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="2" creatureType="Allies" andOr="and"/>
    } else if (card.target === 'Self and 3 Allies') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="3" creatureType="Allies" andOr="and"/>
    } else if (card.target === 'Self and All Allies') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="All" creatureType="Allies" andOr="and"/>
    } else if (card.target === 'Self and All Creatures') {
        return <TargetSelfAndCreatures card={card} bgColorGetter={bgColorGetter} numCreatures="All" creatureType="Creatures" andOr="and"/>
    } else if (card.target === 'Special') {
        return <TargetBasic card={card} bgColorGetter={bgColorGetter} text="Special" fontSize={7} leading={8}/>
    } else if (card.target === 'None') {
        return <></>
    } else {
        return <TargetBasic card={card} bgColorGetter={bgColorGetter} text={card.target} fontSize={11} leading={12}/>
    }
}
