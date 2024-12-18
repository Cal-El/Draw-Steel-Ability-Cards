import { useState } from 'react'
import './App.css'
import AbilityCard from "./components/ability-card/ability-card.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className={"flex flex-wrap flex-row h-screen w-screen bg-zinc-500 items-center justify-center center"}>
            <AbilityCard card={{
                type: 'Action',
                source: 'Null Signature',
                title: 'Pressure Points',
                keywords: [
                    'Attack',
                    'Melee',
                    'Psionic',
                    'Weapon',
                ],
                flavour: 'You strike at key nerve clusters.',
                statements: [
                    {
                        characteristic: "Agility",
                        t1: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '4',
                            hasGeneralEffect: false,
                            generalEffect: '',
                            hasPotency: true,
                            potencyValue: 'A1',
                            potencyEffect: 'Weakened (save ends)',
                        },
                        t2: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '6',
                            hasGeneralEffect: false,
                            generalEffect: '',
                            hasPotency: true,
                            potencyValue: 'A2',
                            potencyEffect: 'Weakened (save ends)',
                        },
                        t3: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '7',
                            hasGeneralEffect: false,
                            generalEffect: '',
                            hasPotency: true,
                            potencyValue: 'A3',
                            potencyEffect: 'Weakened (save ends)',
                        },
                    },
                ],
                hasCost: false,
                cost: null,
                target: '1 Creature or Object',
                distance: [
                    {
                        distanceHeader: 'Melee',
                        distanceValue: '1',
                    },
                ],
            }} />
            <AbilityCard card={{
                type: 'Triggered Action',
                source: 'Null',
                title: 'Inertial Shield',
                keywords: [
                    'Psionic',
                ],
                flavour: 'You intuit where an incoming attack will strike, reducing its effects.',
                statements: [
                    {
                        key: "Trigger",
                        value: "You take damage.",
                    },
                    {
                        key: "Effect",
                        value: "You gain 🛡️ for the attack and reduce any potency of effects associated with the damage by 1.",
                    },
                ],
                hasCost: false,
                cost: null,
                target: 'Self',
                distance: [
                    {
                        distanceHeader: 'Distance',
                        distanceValue: 'Self',
                    },
                ],
            }} />
            <AbilityCard card={{
                type: 'Maneuver',
                source: 'Null',
                title: 'Null Field',
                keywords: [
                    'Psionic',
                ],
                flavour: 'Magic is a form of chaos. My body is beyond such things.',
                statements: [
                    {
                        key: "Effect",
                        value: "Until you are dying, attacks with the Magic or Psionic keyword take a bane if they target a target within the aura or are made by an enemy within the aura. \n\n" +
                            "Resistance rolls against abilities with the Magic or Psionic keyword have an edge if they target a target within the aura or are used by an enemy within the aura. These effects increase to a double bane or a double edge, respectively, if the creature using the ability is grabbed by you.",
                    },
                ],
                hasCost: false,
                cost: null,
                target: 'Self and All Creatures',
                distance: [
                    {
                        distanceHeader: 'Aura',
                        distanceValue: '1',
                    },
                ],
            }} />
        </div>
    </>
  )
}

export default App
