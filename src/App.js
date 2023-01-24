import React, {useEffect, useState} from "react";
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {
    const [dice, setNewDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)


    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    //help function to symplify the allNewDice code and the rollDice function
    function generateNewDice() {
        return {
            value : Math.floor((Math.random() * 6) + 1),
            isHeld : false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++ ) {
            newDice.push(generateNewDice())
        }
        return newDice
    }

    function holdDice(id) {
        setNewDice(oldDice => 
            oldDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld}: die
            })
            )
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id}
            value = {die.value}
            isHeld = {die.isHeld}
            holdDice= {() => holdDice(die.id)}
        />
    ))

    function rollDice() {
        if (!tenzies) {
            setNewDice(prevDice => 
                prevDice.map(die => {
                    return die.isHeld ? die : generateNewDice()
                }))
        }else {
            setTenzies(false)
            setNewDice(allNewDice())
        } 
    }


    return (
        <main>
                {tenzies && <Confetti />}
            <section>
                <div className="content">
                    <h1 className="title">Tenzies</h1>
                    <p className="instruction">
                        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
                    </p>
                    <div className="dice-container">
                        {diceElements}
                    </div>
                    <button 
                        className="roll-dice" 
                        onClick={rollDice}>
                        {tenzies ?  'New Game': 'Roll'}
                    </button>
                    
                </div>
            </section>
        </main>
    )
}