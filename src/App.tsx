import { useState } from 'react'
import './App.css'
import AbilityCard from "./components/ability-card/ability-card.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className={"flex flex-row h-screen w-screen bg-zinc-500 items-center justify-center center"}>
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
                flavour: 'You strike at key nerve clusers.',
                statements: [
                    {
                        characteristic: "Agility",
                        t1: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '4',
                            hasPotency: true,
                            potencyValue: 'A1',
                            potencyEffect: 'Weakened (save ends)',
                            hasGeneralEffect: true,
                            generalEffect: 'Prone',
                        },
                        t2: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '6',
                            hasPotency: true,
                            potencyValue: 'A2',
                            potencyEffect: 'Weakened (save ends)',
                            hasGeneralEffect: true,
                            generalEffect: 'Prone',
                        },
                        t3: {
                            hasDamage: true,
                            damageType: 'Damage',
                            damageValue: '7',
                            hasPotency: true,
                            potencyValue: 'A3',
                            potencyEffect: 'Weakened (save ends)',
                            hasGeneralEffect: true,
                            generalEffect: 'Prone',
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
        </div>
    </>
  )
}

export default App
