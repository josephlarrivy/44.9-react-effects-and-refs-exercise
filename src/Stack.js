import React, { useState, useRef, useEffect } from "react";
import Card from './Card'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const Stack = () => {

    const deck = useRef();
    const [cards, setCards] = useState([]);
    const [displayCard, setDisplayCard] = useState();


    useEffect(function createNewDeck() {
        async function start() {
            let createDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/")
            deck.current = createDeck

            console.log(`deck ${deck}`)
        }
        start();
        // draw();
        console.log(`cards ${cards}`)
        console.log(`displayCard ${displayCard}`)
    }, [])

    async function draw() {

        let newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.current.data.deck_id}/draw/?count=1`);
        console.log(newCard.data.cards[0]);

        setCards(cards => [newCard.data.cards[0], ...cards])
        setDisplayCard(cards[0])

        console.log(`cards ${cards}`)
        console.log(`displayCard ${displayCard}`)
    }


    async function handleClick(evt) {
        evt.preventDefault();
        // const btn = evt.target
        await draw();
    }


    return (
        <>
            <Card imgSource={displayCard.image}/>
            <Card />

            <button onClick={handleClick}>Draw Card</button>
        </>
    )
}


export default Stack;